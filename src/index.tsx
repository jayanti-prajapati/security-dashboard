import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
const container = document.getElementById("app-root")!;
const root = createRoot(container);
import { StoreProvider } from "easy-peasy";
import { store } from "./store";

root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
