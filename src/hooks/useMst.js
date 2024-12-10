import * as React from "react";

const MSTContext = React.createContext(null);
export const { Provider } = MSTContext;

export const useMst = () => React.useContext(MSTContext);
