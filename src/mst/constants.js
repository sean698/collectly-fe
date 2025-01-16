export const SOURCES = {
  CRAIGSLIST: "craigslist",
  KIJIJI: "kijiji",
  VANPEOPLE: "vanpeople",
};

export const LOCATIONS = {
  VANCOUVER: "Vancouver",
  BURNABY: "Burnaby",
  RICHMOND: "Richmond",
  COQUITLAM: "Coquitlam",
  // WEST_VANCOUVER: "West Vancouver",
  // NORTH_VANCOUVER: "North Vancouver",
  WHITE_ROCK: "White Rock",
  NEW_WESTMINSTER: "New Westminster",
  LANGLEY: "Langley",
  DELTA: "Delta",
  MAPLE_RIDGE: "Maple Ridge",
  SURREY: "Surrey",
  // OTHERS: "Others",
};

export const HOUSE_TYPES = {
  APARTMENT: "Apartment",
  HOUSE: "House",
  TOWNHOUSE: "Townhouse",
  BASEMENT: "Basement",
  // OTHERS: "Others",
};

export const FAKE_LISTINGS = [
  {
    id: "1",
    title: "山上招室友，超低价格只要1100！",
    location: "SFU",
    url: "https://c.vanpeople.com/zufang/item-3310433.html",
    price: 1100,
    source: SOURCES.VANPEOPLE,
    bedrooms: 1,
    bathrooms: 1,
    type: HOUSE_TYPES.APARTMENT,
    furnished: true,
    parking: true,
    aircon: true,
    promoted: true,
    imageUrl: "/fake_listing.jpg",
  },
];

export const PAGE_LIMIT = 40;
