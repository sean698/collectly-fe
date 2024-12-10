// import logo from "./logo.svg";
import "App.css";
import { Provider } from "hooks/useMst";
import { rootStore } from "mst/rootstore";

import Header from "components/Header";

function App() {
  return (
    <Provider value={rootStore.create()}>
      <Header />
    </Provider>
  );
}

export default App;
