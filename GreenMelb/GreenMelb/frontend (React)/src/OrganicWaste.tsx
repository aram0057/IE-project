import React, { useState, useEffect } from "react";
import axios from "axios";

interface Waste {
  waste_id: number;
  waste_type: string;
}

interface Centre {
  centre_id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  waste: Waste;  // This will nest the Waste object inside the Centre
}

const Centres: React.FC = () => {
  const [centres, setCentres] = useState<Centre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/centres/")
      .then((response) => {
        setCentres(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Header />
      <h2>Organic waste </h2>
      <p>This page shows info on organic waste </p>
    </div>
  );
};

export default Centres;
