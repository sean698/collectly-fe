import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function Toolbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <MuiToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </MuiToolbar>
      </AppBar>
    </Box>
  );
}
