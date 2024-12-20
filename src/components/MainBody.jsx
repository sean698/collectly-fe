import * as React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import MainContent from "components/MainContent";
import Filter from "components/Filter";
import { observer } from "mobx-react-lite";
import { useMst } from "hooks/useMst";
import { ScaleLoader } from "react-spinners";

function MainBody() {
  const { isAppInitialized } = useMst();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  if (!isAppInitialized) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 160px)",
        }}
      >
        <ScaleLoader color="#FCE303" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* {!isMobile && <Filter />} */}
      <MainContent />
    </Box>
  );
}

export default observer(MainBody);
