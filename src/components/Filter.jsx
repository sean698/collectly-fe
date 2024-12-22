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
                  bedrooms: [e.target.value],
                }))
              }
              label="Bedrooms"
              disabled
            >
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num === 0 ? "Studio" : `${num} BR`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>House Type</InputLabel>
            <Select
              value={filterState.houseTypes}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  houseTypes: [e.target.value],
                }))
              }
              label="House Type"
              disabled
            >
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>
              {Object.values(HOUSE_TYPES).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
          >
            Search
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default observer(Filter);
