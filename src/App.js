import "./App.css";
import "./styles/tailwind.css";
import { Provider } from "hooks/useMst";
import { rootStore } from "mst/rootstore";
import Toolbar from "components/Toolbar";
import { observer } from "mobx-react-lite";
import MainBody from "components/MainBody";
import MagicUiAnimatedBeam from "components/MagicUiAnimatedBeam.tsx";

function App() {
  return (
    <Provider value={rootStore.create()}>
      <div className="tailwind-scope">
        <MagicUiAnimatedBeam />
      </div>
      <Toolbar />
      <MainBody />
    </Provider>
  );
}

export default observer(App);
