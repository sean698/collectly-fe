import Typewriter from "typewriter-effect";
import { Box, Typography } from "@mui/material";

const variations = ["housing", "second-hand", "local services"];

function TypewriterComponent() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          mb: 4,
          color: "#2C3E50",
          fontSize: "2.5rem",
          fontWeight: 600,
          letterSpacing: "0.5px",
          lineHeight: 1.3,
        }}
      >
        Find everything you need in one place
      </Typography>
      <Typography variant="h4" fontWeight="bold" color="#977d3c">
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
