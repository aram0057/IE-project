import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import "./styles.css";
import OrganicWaste from "./OrganicWaste";
import Recyclable from "./Recyclable";
import Achievements from "./Achievements";
import NoPage from "./NoPage";
import IdentifyWaste from "./IdentifyWaste";

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
          <Route path="*" element={<NoPage />} />{" "}
          {/* Handles undefined routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
