import React from "react";
import { Drawer, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMst } from "hooks/useMst";
import Filter from "./Filter";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

function SideDrawer() {
  const { isSideDrawerOpen, closeSideDrawer } = useMst();
  const location = useLocation();
  const isRentalsPage = location.pathname === "/housing";

  return (
    <Drawer
      anchor="left"
      open={isSideDrawerOpen}
      onClose={closeSideDrawer}
      PaperProps={{
        sx: {
          width: 300,
          backgroundColor: "customGrey.light",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton
            onClick={closeSideDrawer}
            sx={{ color: "customYellow.dark" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {isRentalsPage && <Filter inDrawer />}
      </Box>
    </Drawer>
  );
}

export default observer(SideDrawer);
