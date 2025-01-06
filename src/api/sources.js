import axios from "axios";
import { createUrl } from "api/url";
import { SERVER_MAP } from "api/constants";
import { PAGE_LIMIT } from "mst/constants";

export const getRentalListings = async ({
  page = 1,
  locations = [],
  sources,
  minPrice,
  maxPrice,
  bedrooms,
  houseTypes,
}) => {
  console.log("sources", sources);
  const limit = PAGE_LIMIT;
  const source = SERVER_MAP.TREASURE_FINDER;
  const route = "/rentalListings";
  const params = {
    page,
    limit,
    locations,
    sources,
    minPrice,
    maxPrice,
    bedrooms,
    houseTypes,
  };
  const url = createUrl(source, route, params);
  const response = await axios.get(url);
  return response.data;
};

export const submitFeedback = async (feedback) => {
  const source = SERVER_MAP.TREASURE_FINDER;
  const route = "/feedback";
  const url = createUrl(source, route);
  const response = await axios.post(url, { feedback });
  return response.data;
};
