import * as React from "react";
import { Box } from "@mui/material";
import MainContent from "components/MainContent";
import Filter from "components/Filter";
import { observer } from "mobx-react-lite";

function MainBody() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ minWidth: "300px" }}>
        <Filter />
      </Box>
      <Box sx={{ flex: 1 }}>
        <MainContent />
      </Box>
    </Box>
  );
}

export default observer(MainBody);
