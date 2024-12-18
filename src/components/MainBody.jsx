import * as React from "react";
import { Box } from "@mui/material";
import MainContent from "components/MainContent";
import Filter from "components/Filter";
import { observer } from "mobx-react-lite";

function MainBody() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          left: "calc((100% - 80%) / 2 - 200px)",
          top: 70,
          minWidth: "240px",
          height: "fit-content",
        }}
      >
        <Filter />
      </Box>
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <MainContent />
      </Box>
    </Box>
  );
}

export default observer(MainBody);
