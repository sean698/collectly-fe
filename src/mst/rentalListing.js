import { types } from "mobx-state-tree";

const { string, optional, number, model, identifier, maybeNull, boolean } =
  types;

const FirestoreTimestamp = model({
  _seconds: number,
  _nanoseconds: number,
});

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
  createdAt: optional(maybeNull(FirestoreTimestamp), null),
  furnished: optional(maybeNull(boolean), null),
  parking: optional(maybeNull(boolean), null),
  aircon: optional(maybeNull(boolean), null),
})
  .actions((self) => ({}))
  .views((self) => ({
    get createdDate() {
      if (!self.createdAt) return null;
      return new Date(self.createdAt._seconds * 1000);
    },

    get daysAgo() {
      if (!self.createdAt) return null;
      const now = new Date();
      const createdDate = self.createdDate;
      const diffTime = Math.abs(now - createdDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      return `${diffDays} days ago`;
    },
  }));
