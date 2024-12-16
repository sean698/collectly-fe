import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar as MuiToolbar,
  Button,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";

function Toolbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgb(51, 51, 51)",
        }}
      >
        <MuiToolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <ToggleButtonGroup
              // value={location.pathname}
              exclusive
              onChange={(_, newPath) => navigate(newPath)}
              size="small"
              className="ml-4"
              sx={{
                "& .MuiToggleButton-root": {
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  "&.Mui-disabled": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                },
              }}
            >
              <ToggleButton value="/housing" aria-label="housing">
                <ApartmentIcon sx={{ mr: 1 }} />
                Housing
              </ToggleButton>
              <ToggleButton
                value="/second-hand"
                aria-label="second-hand"
                disabled
              >
                <ShoppingBagIcon sx={{ mr: 1 }} />
                Second-hand
              </ToggleButton>
              <ToggleButton value="/services" aria-label="services" disabled>
                <HomeIcon sx={{ mr: 1 }} />
                Services
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Button
            color="inherit"
            sx={{
              border: "1px solid white",
            }}
            onClick={() =>
              window.open("https://portfolio-website-2a3ba.web.app/", "_blank")
            }
          >
            About the Developer
          </Button>
        </MuiToolbar>
      </AppBar>
    </Box>
  );
}

export default observer(Toolbar);
