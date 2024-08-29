import React from "react";
import Header from "./Header.tsx";

const NoPage: React.FC = () => {
  return (
    <div>
      <Header />
      <h2>Error 404 page not found</h2>
      <p>go back to home and try again</p>

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

export default NoPage;
