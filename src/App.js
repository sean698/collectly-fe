import "App.css";
import { Provider } from "hooks/useMst";
import { rootStore } from "mst/rootstore";
import Toolbar from "components/Toolbar";
import { observer } from "mobx-react-lite";
import MainBody from "components/MainBody";

function App() {
  return (
    <Provider value={rootStore.create()}>
      <Toolbar />
      <MainBody />
    </Provider>
  );
}

export default observer(App);
