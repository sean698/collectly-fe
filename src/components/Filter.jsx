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
} from "@mui/material";

function Filter() {
  const { rentalStore } = useMst();
  const { selectedPriceRange, setSelectedPriceRange } = rentalStore;

  const handlePriceChange = (type) => (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);

    if (type === "min") {
      setSelectedPriceRange(value, selectedPriceRange.max);
    } else {
      setSelectedPriceRange(selectedPriceRange.min, value);
    }
  };
  console.log(selectedPriceRange);
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
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
              <InputLabel>Location</InputLabel>
              <Select
                // value={rentalStore.selectedLocation}
                label="Location"
                // onChange={(e) => rentalStore.setSelectedLocation(e.target.value)}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="downtown">Burnaby</MenuItem>
                <MenuItem value="suburbs">Surry</MenuItem>
                <MenuItem value="beach">Richmond</MenuItem>
                <MenuItem value="uptown">Vancouver</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default observer(Filter);
