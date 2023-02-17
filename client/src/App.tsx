import axios from "axios";
//react-query
import { QueryClientProvider } from "@tanstack/react-query";
import queryClientConfig from "./ReactQuery/queryClientConfig";
//component
import DrawerAppbar from "./components/DrawerAppbar";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <QueryClientProvider client={queryClientConfig}>
      <DrawerAppbar />
    </QueryClientProvider>
  );
}

export default App;
