import { types, flow } from "mobx-state-tree";
import { RentalListing } from "./rentalListing";
import { getRentalListings } from "api/sources";
import { PAGE_LIMIT, SOURCES } from "./constants";
import { FilterModel, defaultFilterState } from "./filterModel";

const { model, optional, number, array, boolean } = types;

export const RentalStore = model({
  rentalListings: optional(array(RentalListing), []),
  filter: optional(FilterModel, defaultFilterState),
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
        const { parking, aircon, furnished } = self.filter.facilities;

        const filters = {
          minPrice: self.filter.priceRange.min || undefined,
          maxPrice: self.filter.priceRange.max || undefined,
          bedrooms: self.filter.bedrooms || undefined,
          houseTypes: self.filter.houseTypes,
          locations: self.filter.locations,
          sources:
            self.filter.sources.length === Object.values(SOURCES).length
              ? undefined
              : self.filter.sources,
          parking: parking || undefined,
          aircon: aircon || undefined,
          furnished: furnished || undefined,
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
    resetCurrentPage() {
      self.currentPage = 1;
    },
    setSelectedPriceRange(min, max) {
      self.filter.priceRange = { min, max };
    },
    setSelectedSources(sources) {
      self.filter.sources = sources;
    },
    setSelectedLocations(locations) {
      self.filter.locations = locations;
    },
    setSelectedBedrooms(bedrooms) {
      self.filter.bedrooms = bedrooms;
    },
    setSelectedHouseTypes(types) {
      self.filter.houseTypes = types;
    },
    setSelectedFacilities(facilities) {
      self.filter.facilities = facilities;
    },
    loadMoreListings: flow(function* () {
      if (!self.hasMore || self.isLoading) return;

      try {
        self.isLoading = true;
        const nextPage = self.currentPage + 1;
        const { parking, aircon, furnished } = self.filter.facilities;
        const filters = {
          page: nextPage,
          minPrice: self.filter.priceRange.min || undefined,
          maxPrice: self.filter.priceRange.max || undefined,
          bedrooms: self.filter.bedrooms || undefined,
          houseTypes: self.filter.houseTypes,
          locations: self.filter.locations,
          sources:
            self.filter.sources.length === Object.values(SOURCES).length
              ? undefined
              : self.filter.sources,
          parking: parking || undefined,
          aircon: aircon || undefined,
          furnished: furnished || undefined,
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
