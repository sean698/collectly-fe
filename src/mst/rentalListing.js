import { types } from "mobx-state-tree";

const { string, optional, number, model, identifier, maybeNull } = types;

export const RentalListing = model({
  id: identifier,
  title: string,
  location: string,
  url: string,
  price: number,
  source: string,
  imageUrl: optional(maybeNull(string), null),
})
  .actions((self) => ({}))
  .views((self) => ({}));
