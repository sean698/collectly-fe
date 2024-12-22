import MainBody from "components/MainBody";
import { Box } from "@mui/material";
import Toolbar from "components/Toolbar";

function Rentals() {
  return (
    <>
      <Toolbar />
      <Box sx={{ mt: 12 }}>
        <MainBody />
      </Box>
    </>
  );
}

export default Rentals;
