import url from "url";

const formatQuery = (query) => {
  if (!query) {
    return {};
  }
  return query;
};

export const createUrl = (host, route, query) =>
  url.format({
    protocol: "https",
    host: host,
    pathname: route,
    query: formatQuery(query),
  });
