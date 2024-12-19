import * as React from "react";

const MSTContext = React.createContext(null);
export const { Provider } = MSTContext;

export const useMst = () => {
  const rootStore = React.useContext(MSTContext);
  if (!rootStore) {
    throw new Error("useMst must be used within a MSTProvider");
  }
  return rootStore;
};

export const useSnackbar = () => {
  const rootStore = useMst();
  return {
    showSnackbar: rootStore.showSnackbar,
  };
};
