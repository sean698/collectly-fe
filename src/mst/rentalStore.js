import { values } from "mobx";
import { types, flow } from "mobx-state-tree";
import { RentalListing } from "./rentalListing";
import { getRentalListings } from "api/sources";
import { LOCATIONS } from "./constants";

const { map, model, optional, number, string, array } = types;

export const RentalStore = model({
  vanpeople: optional(map(RentalListing), {}),
  craigslist: optional(map(RentalListing), {}),
  kijiji: optional(map(RentalListing), {}),
  selectedPriceRange: optional(
    model({
      min: optional(number, 0),
      max: optional(number, 0),
    }),
    { min: 0, max: 0 }
  ),
  selectedSources: optional(array(string), []),
  selectedLocations: optional(array(string), []),
})
  .actions((self) => ({
    fetchListings: flow(function* () {
      try {
        const { vanpeople, craigslist, kijiji } = yield getRentalListings();
        vanpeople.forEach((listing) => {
          self.vanpeople.put(RentalListing.create(listing));
        });
        craigslist.forEach((listing) => {
          self.craigslist.put(RentalListing.create(listing));
        });
        kijiji.forEach((listing) => {
          self.kijiji.put(RentalListing.create(listing));
        });
      } catch (error) {
        console.log(error);
      }
    }),
    setSelectedPriceRange(min, max) {
      self.selectedPriceRange = { min, max };
    },
    setSelectedSources(sources) {
      self.selectedSources = sources;
    },
    setSelectedLocations(locations) {
      self.selectedLocations = locations;
    },
  }))
  .views((self) => ({
    get vanpeopleListings() {
      return values(self.vanpeople);
    },
    get craigslistListings() {
      return values(self.craigslist);
    },
    get kijijiListings() {
      return values(self.kijiji);
    },
    get allRentalListings() {
      return [
        ...self.vanpeopleListings,
        ...self.kijijiListings,
        ...self.craigslistListings,
      ].sort((a, b) => a.price - b.price);
    },
    get filteredRentalListings() {
      let listings = self.allRentalListings;

      // Filter by price
      if (
        self.selectedPriceRange.min !== 0 ||
        self.selectedPriceRange.max !== 0
      ) {
        listings = listings.filter((listing) => {
          return (
            listing.price >= self.selectedPriceRange.min &&
            (self.selectedPriceRange.max === 0 ||
              listing.price <= self.selectedPriceRange.max)
          );
        });
      }

      // Filter by sources
      if (self.selectedSources.length > 0) {
        listings = listings.filter((listing) =>
          self.selectedSources.includes(listing.source)
        );
      }

      // Filter by locations
      if (self.selectedLocations.length > 0) {
        listings = listings.filter((listing) => {
          if (self.selectedLocations.includes(LOCATIONS.OTHERS)) {
            return (
              self.selectedLocations.includes(listing.location) ||
              !Object.values(LOCATIONS).includes(listing.location)
            );
          }
          return self.selectedLocations.includes(listing.location);
        });
      }

      return listings;
    },
  }));
