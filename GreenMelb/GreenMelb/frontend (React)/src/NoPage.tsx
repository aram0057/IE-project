import React from "react";
import Header from "./Header.tsx";

const NoPage: React.FC = () => {
  return (
    <div>
      <Header />
      <h2>Error 404 page not found</h2>
      <p>go back to home and try again</p>
    </div>
  );
};

export default NoPage;
