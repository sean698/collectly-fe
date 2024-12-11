import { types, flow } from "mobx-state-tree";
import { RentalListing } from "./rentalListing";
import { getRentalListings } from "api/sources";

const { array, model, optional } = types;

export const RentalStore = model({
  vanpeople: optional(array(RentalListing), []),
  craigslist: optional(array(RentalListing), []),
})
  .actions((self) => ({
    fetchListings: flow(function* () {
      const listings = yield getRentalListings();
      console.log(listings);
      self.isAppInitialized = true;
    }),
  }))
  .views((self) => ({}));
