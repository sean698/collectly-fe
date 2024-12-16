import MagicUiAnimatedBeam from "components/MagicUiAnimatedBeam.tsx";
import TypewriterEffect from "components/Typewriter";
import { Box } from "@mui/material";

function Home() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <TypewriterEffect />
      </Box>
      <div className="tailwind-scope">
        <MagicUiAnimatedBeam />
      </div>
    </>
  );
}

export default Home;
