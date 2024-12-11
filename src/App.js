import "App.css";
import { Provider } from "hooks/useMst";
import { rootStore } from "mst/rootstore";
import Toolbar from "components/Toolbar";
import MainContent from "components/MainContent";

function App() {
  return (
    <Provider value={rootStore.create()}>
      <Toolbar />
      <MainContent />
    </Provider>
  );
}

export default App;
