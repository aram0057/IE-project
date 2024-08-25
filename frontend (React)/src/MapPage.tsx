import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./MapPage.css";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJiaXNoZWsiLCJhIjoiY2x6Y2trYzY5MGNucTJqcHFnMzVhNnhvcyJ9.ruwp1n7aBJwok0LXQyyRNQ";

const MapPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptionPostcode, setSelectedOptionPostcode] =
    useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectChangePostCode = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOptionPostcode(event.target.value);
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [144.9631, -37.8136],
      zoom: 12,
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="map-page">
      <Header />
      <div id="map-container"></div>
      <div className="options-container">
        <label htmlFor="options">Choose a waste type:</label>
        <select
          id="options"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Select...</option>
          <option value="Recycling">Recycling</option>
          <option value="Battery/E waste">Battery/E waste</option>
          <option value="Large or special waste">Large or special waste</option>
        </select>
        <p>You selected: {selectedOption}</p>
      </div>
      <div className="postcode-container">
        <label htmlFor="postcode">Choose your postcode:</label>
        <select
          id="Postcode in Melbourne"
          value={selectedOptionPostcode}
          onChange={handleSelectChangePostCode}
        >
          <option value="">Select...</option>
          <option value="button">button</option>
        </select>
        <p>You selected: {selectedOptionPostcode}</p>
      </div>

      <Footer />
    </div>
  );
};

export default MapPage;
