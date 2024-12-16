import Typewriter from "typewriter-effect";
import { Box, Typography } from "@mui/material";

const variations = ["housing", "second-hand", "local services"];

function TypewriterComponent() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h3"
        sx={{
          mb: 5,
        }}
      >
        Find everything you need in one place
      </Typography>
      <Box
        sx={{
          color: "black",
          fontSize: "2rem",
          fontWeight: "bold",
          minWidth: "600px",
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
      </Box>
    </Box>
  );
}

export default TypewriterComponent;
