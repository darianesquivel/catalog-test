import ReactDOM from "react-dom";
import App from "./App"; //react-query
import { QueryClientProvider } from "@tanstack/react-query";
import queryClientConfig from "./config/queryClientConfig";

const rootNode = document.getElementById("root");
ReactDOM.render(
  <QueryClientProvider client={queryClientConfig}>
    <App />
  </QueryClientProvider>,
  rootNode
);
