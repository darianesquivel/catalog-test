import axios from "axios";
//component
import DrawerAppbar from "./pages/DrawerAppbar/DrawerAppbar";

import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6A5DF9",
      light: "#978efb",
    },
  },
});

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DrawerAppbar />
    </ThemeProvider>
  );
}

export default App;
