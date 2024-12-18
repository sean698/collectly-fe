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

function Toolbar() {
  const navigate = useNavigate();

  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const handleFeedback = () => {
    const email = "shiyuanm000@gmail.com"; // 替换成你的邮箱
    const subject = "Feedback for Collectly";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}`;
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "rgba(51, 51, 51)",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 1,
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                height: "40px",
              }}
              onClick={() => navigate("/")}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "white",
              }}
              onClick={() => navigate("/")}
            >
              COLLECTLY
            </Typography>
          </Box>

          <Box sx={{ display: "fl1", gap: 2 }}>
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
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "rgba(255, 255, 255, 0.5)",
                padding: "4px 8px",
                borderRadius: 1,
                height: "64px",
              }}
            >
              <ShoppingBagIcon fontSize="small" />
              <Typography>Second-hand</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
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

        <Box sx={{ display: "flex", gap: 1, mr: 8 }}>
          <Tooltip title="GitHub">
            <IconButton
              onClick={() => handleExternalLink("https://github.com/sean698")}
              sx={{ color: "white" }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Portfolio">
            <IconButton
              onClick={() =>
                handleExternalLink("https://portfolio-website-2a3ba.web.app/")
              }
              sx={{ color: "white" }}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Send Feedback">
            <IconButton onClick={handleFeedback} sx={{ color: "white" }}>
              <FeedbackIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
}

export default observer(Toolbar);
