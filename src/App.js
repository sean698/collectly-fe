import "./App.css";
import "./styles/tailwind.css";
import { Provider } from "hooks/useMst";
import { rootStore } from "mst/rootstore";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Rentals from "pages/Rentals";
import Toolbar from "components/Toolbar";

function App() {
  return (
    <Provider value={rootStore.create()}>
      <BrowserRouter>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/housing" element={<Rentals />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default observer(App);
