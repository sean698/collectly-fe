import { values } from "mobx";
import { types, flow } from "mobx-state-tree";
import { RentalListing } from "./rentalListing";
import { getRentalListings } from "api/sources";

const { map, model, optional, number } = types;

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
        ...self.craigslistListings,
        ...self.kijijiListings,
      ];
    },
    get filteredRentalListings() {
      if (
        self.selectedPriceRange.min === 0 &&
        self.selectedPriceRange.max === 0
      ) {
        return self.allRentalListings;
      }

      return self.allRentalListings.filter((listing) => {
        return (
          listing.price >= self.selectedPriceRange.min &&
          listing.price <= self.selectedPriceRange.max
        );
      });
    },
  }));
