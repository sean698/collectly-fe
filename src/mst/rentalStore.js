import { types, flow } from "mobx-state-tree";
import { RentalListing } from "./rentalListing";
import { getRentalListings } from "api/sources";

const { model, optional, number, string, array, boolean } = types;

export const RentalStore = model({
  rentalListings: optional(array(RentalListing), []),
  selectedPriceRange: optional(
    model({
      min: optional(number, 0),
      max: optional(number, 0),
    }),
    { min: 0, max: 0 }
  ),
  selectedSources: optional(array(string), []),
  selectedLocations: optional(array(string), []),
  selectedBedrooms: optional(number, 0),
  selectedHouseTypes: optional(array(string), []),
  currentPage: optional(number, 1),
  isLoading: optional(boolean, false),
})
  .actions((self) => ({
    fetchListings: flow(function* () {
      try {
        self.isLoading = true;
        self.currentPage = 1;
        self.rentalListings.clear();

        const filters = {
          minPrice: self.selectedPriceRange.min || undefined,
          maxPrice: self.selectedPriceRange.max || undefined,
          bedrooms: self.selectedBedrooms || undefined,
          houseTypes: self.selectedHouseTypes,
          locations: self.selectedLocations,
          sources: self.selectedSources,
        };
        const listings = yield getRentalListings(filters);

        if (listings && listings.length > 0) {
          listings.forEach((listing) => {
            self.rentalListings.push(RentalListing.create(listing));
          });
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        self.isLoading = false;
      }
    }),
    setSelectedPriceRange(min, max) {
      self.selectedPriceRange = { min, max };
      self.currentPage = 1;
    },
    setSelectedSources(sources) {
      self.selectedSources = sources;
      self.currentPage = 1;
    },
    setSelectedLocations(locations) {
      self.selectedLocations = locations;
      self.currentPage = 1;
    },
    setSelectedBedrooms(bedrooms) {
      self.selectedBedrooms = bedrooms;
      self.currentPage = 1;
    },
    setSelectedHouseTypes(types) {
      self.selectedHouseTypes = types;
      self.currentPage = 1;
    },
    loadMoreListings: flow(function* () {
      try {
        console.log("loading more listings");
        self.isLoading = true;
        const nextPage = self.currentPage + 1;
        console.log("loading more listings", nextPage);
        const filters = {
          page: nextPage,
          minPrice: self.selectedPriceRange.min || undefined,
          maxPrice: self.selectedPriceRange.max || undefined,
          locations: self.selectedLocations,
          sources: self.selectedSources,
        };
        const listings = yield getRentalListings(filters);

        if (listings && listings.length > 0) {
          listings.forEach((listing) => {
            self.rentalListings.push(RentalListing.create(listing));
          });
          self.currentPage = nextPage;
        }
      } catch (error) {
        console.error("Error loading more listings:", error);
      } finally {
        self.isLoading = false;
      }
    }),
  }))
  .views((self) => ({
    get sortedRentalListings() {
      return self.rentalListings.slice().sort((a, b) => a.price - b.price);
    },
  }));
