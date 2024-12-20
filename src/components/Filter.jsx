import * as React from "react";
import { useMst } from "hooks/useMst";
import { observer } from "mobx-react-lite";
import {
  Box,
  Container,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { SOURCES, LOCATIONS, HOUSE_TYPES } from "mst/constants";

function Filter({ inDrawer }) {
  const { rentalStore } = useMst();
  const {
    selectedPriceRange,
    setSelectedPriceRange,
    selectedSources,
    setSelectedSources,
    selectedBedrooms,
    setSelectedBedrooms,
    selectedHouseTypes,
    setSelectedHouseTypes,
  } = rentalStore;

  const handlePriceChange = (type) => (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    if (type === "min") {
      setSelectedPriceRange(value, selectedPriceRange.max);
    } else {
      setSelectedPriceRange(selectedPriceRange.min, value);
    }
  };

  return (
    <Box
      sx={{
        position: inDrawer ? "static" : "fixed",
        left: inDrawer ? "auto" : "calc((100% - 80%) / 2 - 200px)",
        top: inDrawer ? "auto" : 70,
        minWidth: inDrawer ? "auto" : "240px",
        height: "fit-content",
        width: "100%",
      }}
    >
      {!inDrawer ? (
        <Container maxWidth="lg">
          <Box
            sx={{
              mt: inDrawer ? 0 : 4,
              minWidth: inDrawer ? "auto" : "250px",
              maxWidth: inDrawer ? "none" : "250px",
            }}
          >
            <Paper sx={{ p: 2 }}>
              <Stack direction="column" spacing={2}>
                <TextField
                  label="Min Price"
                  type="number"
                  value={selectedPriceRange.min}
                  onChange={handlePriceChange("min")}
                  fullWidth
                />
                <TextField
                  label="Max Price"
                  type="number"
                  value={selectedPriceRange.max}
                  onChange={handlePriceChange("max")}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Bedrooms</InputLabel>
                  <Select
                    value={selectedBedrooms}
                    onChange={(e) => setSelectedBedrooms([e.target.value])}
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
                    value={selectedHouseTypes}
                    onChange={(e) => setSelectedHouseTypes([e.target.value])}
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
                    value={selectedSources}
                    onChange={(e) => setSelectedSources(e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                    label="Source"
                  >
                    {Object.entries(SOURCES).map(([key, value]) => (
                      <MenuItem key={value} value={value}>
                        <Checkbox checked={selectedSources.includes(value)} />
                        <ListItemText primary={key.toLowerCase()} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    multiple
                    value={rentalStore.selectedLocations}
                    onChange={(e) =>
                      rentalStore.setSelectedLocations(e.target.value)
                    }
                    renderValue={(selected) => selected.join(", ")}
                    label="Location"
                  >
                    {Object.values(LOCATIONS).map((location) => (
                      <MenuItem key={location} value={location}>
                        <Checkbox
                          checked={rentalStore.selectedLocations.includes(
                            location
                          )}
                        />
                        <ListItemText primary={location} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Paper>
          </Box>
        </Container>
      ) : (
        <Box
          sx={{
            mt: inDrawer ? 0 : 4,
            minWidth: inDrawer ? "auto" : "250px",
            maxWidth: inDrawer ? "none" : "250px",
          }}
        >
          <Paper sx={{ p: 2 }}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Min Price"
                type="number"
                value={selectedPriceRange.min}
                onChange={handlePriceChange("min")}
                fullWidth
              />
              <TextField
                label="Max Price"
                type="number"
                value={selectedPriceRange.max}
                onChange={handlePriceChange("max")}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Bedrooms</InputLabel>
                <Select
                  value={selectedBedrooms}
                  onChange={(e) => setSelectedBedrooms([e.target.value])}
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
                  value={selectedHouseTypes}
                  onChange={(e) => setSelectedHouseTypes([e.target.value])}
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
                  value={selectedSources}
                  onChange={(e) => setSelectedSources(e.target.value)}
                  renderValue={(selected) => selected.join(", ")}
                  label="Source"
                >
                  {Object.entries(SOURCES).map(([key, value]) => (
                    <MenuItem key={value} value={value}>
                      <Checkbox checked={selectedSources.includes(value)} />
                      <ListItemText primary={key.toLowerCase()} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  multiple
                  value={rentalStore.selectedLocations}
                  onChange={(e) =>
                    rentalStore.setSelectedLocations(e.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                  label="Location"
                >
                  {Object.values(LOCATIONS).map((location) => (
                    <MenuItem key={location} value={location}>
                      <Checkbox
                        checked={rentalStore.selectedLocations.includes(
                          location
                        )}
                      />
                      <ListItemText primary={location} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

Filter.defaultProps = {
  inDrawer: false,
};

export default observer(Filter);
