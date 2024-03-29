import ReactDOM from "react-dom";
import App from "./App"; //react-query
import { QueryClientProvider } from "@tanstack/react-query";
import queryClientConfig from "./config/queryClientConfig";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const rootNode = document.getElementById("root");
ReactDOM.render(
  <QueryClientProvider client={queryClientConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
  rootNode
);
