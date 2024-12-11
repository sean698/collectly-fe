import { types } from "mobx-state-tree";

const { string, optional, number, model, identifier } = types;

export const RentalListing = model({
  id: identifier,
  title: string,
  location: string,
  url: string,
  price: number,
  source: string,
  imageUrl: optional(string, ""),
})
  .actions((self) => ({}))
  .views((self) => ({}));
