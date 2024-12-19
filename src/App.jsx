import "./App.css";
import "./styles/tailwind.css";
import { Provider } from "hooks/useMst";
import { rootStore } from "mst/rootstore";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Rentals from "pages/Rentals";
import Toolbar from "components/Toolbar";
import BackgroundGradient from "components/BackgroundGradient";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import GlobalSnackbar from "components/GlobalSnackbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={rootStore.create()}>
        <BrowserRouter>
          <BackgroundGradient />
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/housing" element={<Rentals />} />
          </Routes>
          <GlobalSnackbar />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default observer(App);
