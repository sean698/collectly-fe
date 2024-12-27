import * as React from "react";
import { useMst } from "hooks/useMst";
import { observer } from "mobx-react-lite";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { SOURCES, LOCATIONS, HOUSE_TYPES } from "mst/constants";

function Filter() {
  const { rentalStore } = useMst();
  const {
    selectedPriceRange,
    setSelectedPriceRange,
    setSelectedSources,
    setSelectedLocations,
    setSelectedBedrooms,
    setSelectedHouseTypes,
    fetchListings,
  } = rentalStore;

  const [filterState, setFilterState] = React.useState({
    priceRange: { min: selectedPriceRange.min, max: selectedPriceRange.max },
    sources: rentalStore.selectedSources,
    locations: rentalStore.selectedLocations,
    bedrooms: rentalStore.selectedBedrooms,
    houseTypes: rentalStore.selectedHouseTypes,
  });

  const handlePriceChange = (type) => (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    setFilterState((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value,
      },
    }));
  };

  const handleSearch = () => {
    setSelectedPriceRange(
      filterState.priceRange.min,
      filterState.priceRange.max
    );
    setSelectedSources(filterState.sources);
    setSelectedLocations(filterState.locations);
    setSelectedBedrooms(filterState.bedrooms);
    setSelectedHouseTypes(filterState.houseTypes);

    fetchListings();
  };

  const handleReset = () => {
    const initialState = {
      priceRange: { min: 0, max: 0 },
      sources: [],
      locations: [],
      bedrooms: 0,
      houseTypes: [],
    };

    setFilterState(initialState);

    setSelectedPriceRange(0, 0);
    setSelectedSources([]);
    setSelectedLocations([]);
    setSelectedBedrooms(0);
    setSelectedHouseTypes([]);

    fetchListings();
  };

  return (
    <Box sx={{ minWidth: "250px", maxWidth: "250px" }}>
      <Paper sx={{ p: 2 }}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Min Price"
            type="number"
            value={filterState.priceRange.min}
            onChange={handlePriceChange("min")}
            fullWidth
          />
          <TextField
            label="Max Price"
            type="number"
            value={filterState.priceRange.max}
            onChange={handlePriceChange("max")}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Bedrooms</InputLabel>
            <Select
              value={filterState.bedrooms}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  bedrooms: e.target.value,
                }))
              }
              label="Bedrooms"
            >
              <MenuItem value={0}>
                <em>Any</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3+</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>House Type</InputLabel>
            <Select
              multiple
              value={filterState.houseTypes}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  houseTypes: e.target.value,
                }))
              }
              renderValue={(selected) => selected.join(", ")}
              label="House Type"
            >
              {Object.values(HOUSE_TYPES).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filterState.houseTypes.includes(type)} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              multiple
              value={filterState.sources}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  sources: e.target.value,
                }))
              }
              renderValue={(selected) => selected.join(", ")}
              label="Source"
            >
              {Object.entries(SOURCES).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  <Checkbox checked={filterState.sources.includes(value)} />
                  <ListItemText primary={key.toLowerCase()} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              multiple
              value={filterState.locations}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  locations: e.target.value,
                }))
              }
              renderValue={(selected) => selected.join(", ")}
              label="Location"
            >
              {Object.values(LOCATIONS).map((location) => (
                <MenuItem key={location} value={location}>
                  <Checkbox
                    checked={filterState.locations.includes(location)}
                  />
                  <ListItemText primary={location} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              fullWidth
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default observer(Filter);
