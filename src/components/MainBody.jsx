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
  const shouldHideRentalFilter = useMediaQuery(
    theme.breakpoints.down("hideRentalFilter")
  );

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
      {!shouldHideRentalFilter && (
        <Box
          sx={{
            position: "fixed",
            top: 100,
            left: "calc(15% - 240px)",
          }}
        >
          <Filter />
        </Box>
      )}
      <MainContent />
    </Box>
  );
}

export default observer(MainBody);
