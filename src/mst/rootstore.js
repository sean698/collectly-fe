import { types, flow } from "mobx-state-tree";
import { RentalStore } from "mst/rentalStore";

const { string, optional, boolean } = types;

const SnackbarModel = types
  .model("SnackbarModel", {
    isOpen: false,
    message: "",
    severity: types.optional(
      types.enumeration(["success", "error", "warning", "info"]),
      "success"
    ),
  })
  .actions((self) => ({
    show(message, severity = "success") {
      self.message = message;
      self.severity = severity;
      self.isOpen = true;
    },
    hide() {
      self.isOpen = false;
    },
  }));

export const rootStore = types
  .model({
    userEmail: optional(string, ""),
    isAppInitialized: optional(boolean, false),
    rentalStore: optional(RentalStore, {}),
    snackbar: optional(SnackbarModel, {}),
  })
  .actions((self) => ({
    afterCreate: flow(function* () {
      yield self.initializeApp();
    }),
    initializeApp: flow(function* () {
      yield self.rentalStore.fetchListings();
      self.isAppInitialized = true;
    }),
    showSnackbar(message, severity) {
      self.snackbar.show(message, severity);
    },
  }))
  .views((self) => ({
    // Define computed values and views here
  }));
