import MagicUiAnimatedBeam from "components/MagicUiAnimatedBeam.tsx";
import TypewriterEffect from "components/Typewriter";
import { Box } from "@mui/material";
import Toolbar from "components/Toolbar";

function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar />
      <Box sx={{ mt: 10 }}>
        <Box
          sx={{
            width: "100%",
            height: "22vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TypewriterEffect />
        </Box>
        <MagicUiAnimatedBeam />
      </Box>
    </Box>
  );
}

export default Home;
