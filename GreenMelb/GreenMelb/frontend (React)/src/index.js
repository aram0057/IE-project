import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Header from "./Header.tsx";
import IdentifyWaste from "./IdentifyWaste.tsx";
import MapPage from "./MapPage.tsx";
import Home from "./Home.tsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
