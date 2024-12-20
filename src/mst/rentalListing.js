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
  bedrooms: optional(maybeNull(number), null),
  bathrooms: optional(maybeNull(number), null),
  size: optional(maybeNull(number), null),
  type: optional(maybeNull(string), null),
})
  .actions((self) => ({}))
  .views((self) => ({}));
