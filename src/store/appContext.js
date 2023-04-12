import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";


const defaultTheme = {

};

export const AppContextInstance = createContext({});

const AppContext = ({ children }) => {
  const [theme,] = useState(defaultTheme);

  const queryClient = new QueryClient()
  const initialState = {}


  return (
    <AppContextInstance.Provider value={initialState}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </AppContextInstance.Provider>
  );
};

export default AppContext;
