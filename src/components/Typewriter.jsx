import Typewriter from "typewriter-effect";
import { Box, Typography } from "@mui/material";

const variations = ["housing rentals", "second-hand", "local services"];

function TypewriterComponent() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          mb: 4,
          color: "customGrey.dark",
          fontSize: { xs: "1.5rem", md: "2.5rem" },
          fontWeight: 600,
          letterSpacing: "0.5px",
          lineHeight: 1.3,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          px: 3,
        }}
      >
        Find everything you need in Metro Vancouver
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          color: "customYellow.dark",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",
          letterSpacing: "1px",
        }}
      >
        <Typewriter
          options={{
            strings: variations,
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
          }}
        />
      </Typography>
    </Box>
  );
}

export default TypewriterComponent;
