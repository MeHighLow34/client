import React from "react";
import ReactDOM from "react-dom/client";

import "normalize.css";
import "./assets/styles/styles.css";
import App from "./App";

import { AppProvider } from "./context/appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AppProvider>
      <App />
    </AppProvider>
  </>
);
