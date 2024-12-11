import { types, flow } from "mobx-state-tree";
import { RentalStore } from "mst/rentalStore";

const { string, optional, boolean } = types;

export const rootStore = types
  .model({
    userEmail: optional(string, ""),
    isAppInitialized: optional(boolean, false),
    rentalStore: optional(RentalStore, {}),
  })
  .actions((self) => ({
    afterCreate: flow(function* () {
      yield self.initializeApp();
    }),
    initializeApp: flow(function* () {
      try {
        yield self.rentalStore.fetchListings();
      } catch (error) {
        console.error("Failed to initialize:", error);
      }
    }),
  }))
  .views((self) => ({
    // Define computed values and views here
  }));
