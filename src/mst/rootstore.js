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
        self.isAppInitialized = false;
        yield self.rentalStore.fetchListings();
        self.isAppInitialized = true;
      } catch (error) {
        self.isAppInitialized = true;
        console.error("Failed to initialize app", error);
      }
    }),
  }))
  .views((self) => ({
    // Define computed values and views here
  }));
