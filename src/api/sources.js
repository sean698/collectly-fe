import axios from "axios";
import { createUrl } from "api/url";
import { SERVER_MAP } from "api/constants";

export const getRentalListings = async () => {
  const source = SERVER_MAP.TREASURE_FINDER;
  const route = "/rentalListings";
  const url = createUrl(source, route);
  const response = await axios.get(url);
  return response.data;
};
