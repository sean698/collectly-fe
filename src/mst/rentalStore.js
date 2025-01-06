import { types, flow } from "mobx-state-tree";
import { RentalListing } from "./rentalListing";
import { getRentalListings } from "api/sources";
import { PAGE_LIMIT, SOURCES } from "./constants";

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
  selectedSources: optional(array(string), Object.values(SOURCES)),
  selectedLocations: optional(array(string), []),
  selectedBedrooms: optional(number, 0),
  selectedHouseTypes: optional(array(string), []),
  currentPage: optional(number, 1),
  hasMore: optional(boolean, true),
  isLoading: optional(boolean, false),
})
  .actions((self) => ({
    fetchListings: flow(function* () {
      try {
        self.isLoading = true;
        self.currentPage = 1;
        self.hasMore = true;
        self.rentalListings.clear();

        const filters = {
          minPrice: self.selectedPriceRange.min || undefined,
          maxPrice: self.selectedPriceRange.max || undefined,
          bedrooms: self.selectedBedrooms || undefined,
          houseTypes: self.selectedHouseTypes,
          locations: self.selectedLocations,
          sources:
            self.selectedSources.length === Object.values(SOURCES).length
              ? undefined
              : self.selectedSources,
        };
        const listings = yield getRentalListings(filters);

        if (listings && listings.length > 0) {
          listings.forEach((listing) => {
            self.rentalListings.push(RentalListing.create(listing));
          });
          self.hasMore = listings.length === PAGE_LIMIT;
        } else {
          self.hasMore = false;
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        self.hasMore = false;
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
      if (!self.hasMore || self.isLoading) return;

      try {
        self.isLoading = true;
        const nextPage = self.currentPage + 1;
        const filters = {
          page: nextPage,
          minPrice: self.selectedPriceRange.min || undefined,
          maxPrice: self.selectedPriceRange.max || undefined,
          bedrooms: self.selectedBedrooms || undefined,
          houseTypes: self.selectedHouseTypes,
          locations: self.selectedLocations,
          sources:
            self.selectedSources.length === Object.values(SOURCES).length
              ? undefined
              : self.selectedSources,
        };
        const listings = yield getRentalListings(filters);

        if (listings && listings.length > 0) {
          listings.forEach((listing) => {
            self.rentalListings.push(RentalListing.create(listing));
          });
          self.currentPage = nextPage;
          self.hasMore = listings.length === PAGE_LIMIT;
        } else {
          self.hasMore = false;
        }
      } catch (error) {
        console.error("Error loading more listings:", error);
        self.hasMore = false;
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
