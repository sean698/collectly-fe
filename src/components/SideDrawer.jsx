import React from "react";
import { Drawer, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMst } from "hooks/useMst";
import Filter from "./Filter";
import { observer } from "mobx-react-lite";
function SideDrawer() {
  const { isSideDrawerOpen, closeSideDrawer } = useMst();

  return (
    <Drawer
      anchor="left"
      open={isSideDrawerOpen}
      onClose={closeSideDrawer}
      PaperProps={{
        sx: {
          width: 300,
          backgroundColor: "white",
          backdropFilter: "blur(8px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={closeSideDrawer} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Filter inDrawer />
      </Box>
    </Drawer>
  );
}

export default observer(SideDrawer);
