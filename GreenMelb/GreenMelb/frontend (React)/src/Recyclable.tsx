import React from "react";
import Header from "./Header.tsx";

const Recyclable: React.FC = () => {
  return (
    <div>
      <Header />
      <h2>Recyclable waste </h2>
      <p>This page shows info on Recyclable waste </p>

      <footer className="footer">
                <p>&copy; 2024 Green Melb. All rights reserved.</p>
                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </nav>
            </footer>
    </div>
  );
};

export default Recyclable;
