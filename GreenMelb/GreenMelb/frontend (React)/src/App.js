import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import "./styles.css";
import OrganicWaste from "./OrganicWaste.tsx";
import Recyclable from "./Recyclable.tsx";
import Achievements from "./Achievements.tsx";
import NoPage from "./NoPage.tsx";
import IdentifyWaste from "./IdentifyWaste.tsx";
import MapPage from "./MapPage.tsx";

export default function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/OrganicWaste" element={<OrganicWaste />} />
            <Route path="/recyclable" element={<Recyclable />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/IdentifyWaste" element={<IdentifyWaste />} />
            <Route path="/MapPage" element={<MapPage />} />
            <Route path="*" element={<NoPage />} />{" "}
            {/* Handles undefined routes */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}
