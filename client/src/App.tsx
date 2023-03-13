import axios from "axios";
//component
import DrawerAppbar from "./pages/DrawerAppbar/DrawerAppbar";
import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStore } from "./pages/DrawerAppbar/DrawerAppbar";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = useStore((state: any) => state.mode);

  //custom theme
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#6A5DF9",
                  light: "#DAD7FD",
                },
              }
            : {
                primary: {
                  main: "#978efb",
                  light: "#DAD7FD",
                },
              }),
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: "Inter, -apple-system, Arial, Sans-Serif",
          fontSize: 14,
          h6: {
            fontFamily: "Inter, -apple-system, Arial, Sans-Serif",
            letterSpacing: "0.0075em",
          },
        },
      }),
    [prefersDarkMode, mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrawerAppbar />
    </ThemeProvider>
  );
}

export default App;
