import { types } from "mobx-state-tree";

const { string, optional } = types;

export const rootStore = types
  .model({
    userEmail: optional(string, ''),
  })
  .actions((self) => ({
    // Define actions to modify the store here
  }))
  .views((self) => ({
    // Define computed values and views here
  }));


