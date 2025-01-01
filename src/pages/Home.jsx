import MagicUiAnimatedBeam from "components/MagicUiAnimatedBeam.tsx";
import TypewriterEffect from "components/Typewriter";
import { Box } from "@mui/material";
import Toolbar from "components/Toolbar";
import { observer } from "mobx-react-lite";
import { useMst } from "hooks/useMst";

function Home() {
  const { isSafari } = useMst();

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
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TypewriterEffect />
        </Box>
        {!isSafari && <MagicUiAnimatedBeam />}
      </Box>
    </Box>
  );
}

export default observer(Home);
