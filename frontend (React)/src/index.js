import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Header from "./Header";
import IdentifyWaste from "./IdentifyWaste";
import MapPage from "./MapPage";
import Home from "./Home";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
