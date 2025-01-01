import * as React from "react";
import {
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonIcon from "@mui/icons-material/Person";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MenuIcon from "@mui/icons-material/Menu";
import { useMst } from "hooks/useMst";
import SideDrawer from "./SideDrawer";
import FeedbackDialog from "./FeedbackDialog";
import { submitFeedback } from "api/sources";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

function Toolbar() {
  const theme = useTheme();
  const {
    openSideDrawer,
    openFeedbackDialog,
    closeFeedbackDialog,
    isFeedbackDialogOpen,
  } = useMst();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const handleFeedbackSubmit = async (feedbackText) => {
    try {
      closeFeedbackDialog();
      submitFeedback(feedbackText);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "rgba(51, 51, 51, 0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <MuiToolbar
          sx={{
            width: "80%",
            height: "50px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openSideDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 2,
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  height: isMobile ? "30px" : "40px",
                }}
                onClick={() => navigate("/")}
              />
              <Typography
                variant="h5"
                sx={{
                  display: isMobile ? "none" : "",
                  fontWeight: 700,
                  color: "white",
                }}
                onClick={() => navigate("/")}
              >
                COLLECTLY
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                onClick={() => navigate("/housing")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "white",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: 1,
                  // height: "64px",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ApartmentIcon fontSize="small" />
                <Typography>Housing</Typography>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  gap: 0.5,
                  color: "rgba(255, 255, 255, 0.5)",
                  padding: "4px 8px",
                  borderRadius: 1,
                  height: "64px",
                  minWidth: "122px",
                }}
              >
                <ShoppingBagIcon fontSize="small" />
                <Typography>Second-hand</Typography>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  gap: 0.5,
                  color: "rgba(255, 255, 255, 0.5)",
                  padding: "4px 8px",
                  borderRadius: 1,
                  height: "64px",
                }}
              >
                <HomeIcon fontSize="small" />
                <Typography>Services</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
              mr: { xs: 0, sm: 8 },
            }}
          >
            <Tooltip title="GitHub">
              <IconButton
                onClick={() => handleExternalLink("https://github.com/sean698")}
                sx={{ color: "white" }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="About the Developer">
              <IconButton
                onClick={() =>
                  handleExternalLink("https://portfolio-website-2a3ba.web.app/")
                }
                sx={{ color: "white" }}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Feedback">
              <IconButton onClick={openFeedbackDialog} sx={{ color: "white" }}>
                <FeedbackIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </MuiToolbar>
      </AppBar>
      <SideDrawer />
      <FeedbackDialog
        open={isFeedbackDialogOpen}
        onClose={closeFeedbackDialog}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  );
}

export default observer(Toolbar);
