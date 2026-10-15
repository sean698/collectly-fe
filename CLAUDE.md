# collectly-fe

React UI for the Collectly rental aggregator. Shows Greater Vancouver
rentals as a list or a map. One of three repos: `collectly-fe` (this),
`collectly-be` (API), `collectly-crawler` (scraper).

## Architecture

```
React (CRA) + MobX State Tree + MUI
  -> axios -> collectly-be /rentalListings
Firebase Hosting (SPA, build/ served, rewrites to index.html)
```

- GCP project: `treasure-finder-62cd0`.
- Deploy: push to `main` runs `.github/workflows/firebase-hosting-merge.yml`
  (`npm ci && npm run build` -> Firebase Hosting, channel `live`). PRs
  get a preview channel.
- `npm run build` uses `CI=false` so warnings don't fail the build.

## State (MobX State Tree, src/mst/)

- `rootstore.js` -> `rentalStore.js` -> `filterModel.js` + `rentalListing.js`.
- `rentalStore`: `rentalListings`, `filter`, pagination (`currentPage`,
  `hasMore`, `isLoading`), and `viewMode` ("list" | "map").
- `fetchListings` / `loadMoreListings` build the query from `filter` and
  call the API. When all sources are selected, `sources` is sent as
  undefined (means "all") to keep the URL short.
- Access the store via `useMst()` (src/hooks/useMst.js).

## Filters (src/components/Filter.jsx, src/mst/constants.js)

Active filters: price range, bedrooms, House Type, Source, Location.

- `SOURCES`: craigslist, kijiji, vansky. (vanpeople was retired; the
  crawler replaced it with vansky.)
- `HOUSE_TYPES`: Apartment, House, Townhouse, Basement — shared
  vocabulary with the crawler. All three sources populate `type`.
- `LOCATIONS`: a fixed city list. Location matching upstream uses
  hardcoded maps and is imperfect; the map view is the better way to see
  where listings are.
- Parking / air conditioning / furnished filters were REMOVED (fill
  rates too uneven across sources). The per-card facility icons remain —
  they only render when data is present. Do not re-add the filters.

## Views (src/components/)

- `MainBody` -> `Filter` (fixed sidebar) + `MainContent`.
- `MainContent`: list/map toggle (ToggleButtonGroup). List is a MUI card
  grid with infinite scroll (IntersectionObserver -> loadMoreListings).
- `MapView.jsx`: Leaflet + OpenStreetMap (no API key, free). One price
  pin per listing, clustered when dense (react-leaflet-cluster), popup
  with photo/title/price/location linking to the source. Listings
  without `latitude`/`longitude` are omitted from the map but stay in
  the list.
- `MagicUiAnimatedBeam.tsx`: decorative home-page animation showing
  source logos. It is marketing, not the real source list — it includes
  logos for sources not actually scraped (rednote, facebook). Leave it
  alone unless asked.

## Map stack

- `leaflet` + `react-leaflet@4` (React 18 compatible) +
  `react-leaflet-cluster@2`. Chosen over Google Maps to avoid an API
  key, billing, and quota. `import "leaflet/dist/leaflet.css"` is
  required (done in MapView).

## Local run

```
npm install
npm start          # dev server
npm run build      # production build; also the best way to catch
                   # JSX/import errors before pushing
```

The API base URL is in src/api/constants.js (SERVER_MAP).

## Conventions

- Keep the API response shape in sync with `rentalListing.js`
  (`src/mst/`). New crawler/API fields need a field here or MST drops
  them.
- Communicate with the user in Chinese per global prefs; code and
  identifiers stay in English.
