import React from "react";
import { Drawer, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Filter from "./Filter";

function SideDrawer({ open, onClose }) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
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
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Filter inDrawer />
      </Box>
    </Drawer>
  );
}

export default SideDrawer;
