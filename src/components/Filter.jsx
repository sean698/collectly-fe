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
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { SOURCES, LOCATIONS, HOUSE_TYPES } from "mst/constants";

function Filter() {
  const { rentalStore } = useMst();
  const { filter, fetchListings } = rentalStore;

  const handlePriceChange = (type) => (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    filter.setPriceRange(type, value);
  };

  const handleFacilityChange = (facility) => (event) => {
    filter.setFacilities(facility, event.target.checked);
  };

  const handleSearch = () => {
    fetchListings();
  };

  const handleReset = () => {
    filter.reset();
    fetchListings();
  };

  return (
    <Box sx={{ minWidth: "250px", maxWidth: "250px" }}>
      <Paper
        sx={{
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <Stack direction="column" spacing={2}>
          <TextField
            label="Min Price"
            type="number"
            value={filter.priceRange.min}
            onChange={handlePriceChange("min")}
            fullWidth
          />
          <TextField
            label="Max Price"
            type="number"
            value={filter.priceRange.max}
            onChange={handlePriceChange("max")}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Bedrooms</InputLabel>
            <Select
              value={filter.bedrooms}
              onChange={(e) => filter.setBedrooms(e.target.value)}
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
              value={filter.houseTypes}
              onChange={(e) => filter.setHouseTypes(e.target.value)}
              renderValue={(selected) => selected.join(", ")}
              label="House Type"
            >
              {Object.values(HOUSE_TYPES).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filter.houseTypes.includes(type)} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              multiple
              value={filter.sources}
              onChange={(e) => filter.setSources(e.target.value)}
              renderValue={(selected) => selected.join(", ")}
              label="Source"
            >
              {Object.entries(SOURCES).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  <Checkbox checked={filter.sources.includes(value)} />
                  <ListItemText primary={key.toLowerCase()} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              multiple
              value={filter.locations}
              onChange={(e) => filter.setLocations(e.target.value)}
              renderValue={(selected) => selected.join(", ")}
              label="Location"
            >
              {Object.values(LOCATIONS).map((location) => (
                <MenuItem key={location} value={location}>
                  <Checkbox checked={filter.locations.includes(location)} />
                  <ListItemText primary={location} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.facilities.parking}
                    onChange={handleFacilityChange("parking")}
                  />
                }
                label="Parking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.facilities.aircon}
                    onChange={handleFacilityChange("aircon")}
                  />
                }
                label="Air Conditioning"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.facilities.furnished}
                    onChange={handleFacilityChange("furnished")}
                  />
                }
                label="Furnished"
              />
            </FormGroup>
          </FormControl>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              sx={{
                color: "customYellow.dark",
                borderColor: "customYellow.dark",
                borderWidth: 1.5,
              }}
              onClick={handleReset}
              fullWidth
            >
              Reset
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "customYellow.main",
                color: "backdrop.main",
              }}
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
