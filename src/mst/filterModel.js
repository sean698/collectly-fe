import { types } from "mobx-state-tree";
import { SOURCES } from "./constants";

const { model, optional, number, string, array, boolean } = types;

export const defaultFilterState = {
  priceRange: { min: 0, max: 0 },
  sources: Object.values(SOURCES),
  locations: [],
  bedrooms: 0,
  houseTypes: [],
  facilities: {
    parking: false,
    aircon: false,
    furnished: false,
  },
};

export const FilterModel = model({
  priceRange: model({
    min: optional(number, 0),
    max: optional(number, 0),
  }),
  sources: optional(array(string), Object.values(SOURCES)),
  locations: optional(array(string), []),
  bedrooms: optional(number, 0),
  houseTypes: optional(array(string), []),
  facilities: model({
    parking: optional(boolean, false),
    aircon: optional(boolean, false),
    furnished: optional(boolean, false),
  }),
}).actions((self) => ({
  setPriceRange(type, value) {
    self.priceRange = {
      ...self.priceRange,
      [type]: value,
    };
  },

  setBedrooms(value) {
    self.bedrooms = value;
  },

  setHouseTypes(types) {
    self.houseTypes = types;
  },

  setSources(sources) {
    self.sources = sources;
  },

  setLocations(locations) {
    self.locations = locations;
  },

  setFacilities(facility, value) {
    self.facilities = {
      ...self.facilities,
      [facility]: value,
    };
  },

  setFilter(filterData) {
    Object.assign(self, filterData);
  },

  reset() {
    self.priceRange = { min: 0, max: 0 };
    self.sources = Object.values(SOURCES);
    self.locations = [];
    self.bedrooms = 0;
    self.houseTypes = [];
    self.facilities = { parking: false, aircon: false, furnished: false };
  },
}));
