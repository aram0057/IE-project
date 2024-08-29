import React from "react";
//import './Header.css';
import "./GlobalStyles.css";

const Header: React.FC = () => {
  return (
    <header>
      <h1>Green Melb</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/IdentifyWaste">Identify waste </a>
          </li>
          <li>
            <a href="/MapPage">Recycling centers </a>
          </li>
          <li>
            <a href="/OrganicWaste">Organic waste</a>
          </li>
          <li>
            <a href="/Recyclable">Recyclable</a>
          </li>
          <li>
            <a href="/achievements">Your achievements</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
