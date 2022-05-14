import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./components/landing";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>
);
