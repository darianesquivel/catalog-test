import axios from "axios";
//component
import DrawerAppbar from "./pages/DrawerAppbar/DrawerAppbar";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return <DrawerAppbar />;
}

export default App;
