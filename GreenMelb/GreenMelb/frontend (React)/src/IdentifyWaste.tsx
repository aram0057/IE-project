import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";
import "./GlobalStyles.css";
import "./IdentifyWaste.css";

const IdentifyWaste: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [classificationResults, setClassificationResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append("uploaded_file", selectedImage);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Response from server:", response.data);
        setProcessedImageUrl(`http://127.0.0.1:8000${response.data.processed_file_url}`);
        setClassificationResults(response.data.classifications || []); 
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error uploading the file:", error);
        setError("There was an issue uploading the file.");
      }
    }
  };

  const calculateCumulativeCounts = (classificationResults: string[]) => {
    const counts = classificationResults.reduce((acc: Record<string, number>, classification: string) => {
      acc[classification] = (acc[classification] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([classification, count]) => ({ classification, count }));
  };

  const cumulativeCounts = calculateCumulativeCounts(classificationResults);

  // Define information for each classification
  const classificationInformation: Record<string, string> = {
    "Recyclable": "Recyclable materials can be processed and reused to create new products.",
    "Organic": "Organic waste includes food scraps and other natural materials that decompose easily.",
    "E-Waste": "E-waste refers to discarded electronic devices, which require special handling."
    // Add more classifications and their information here
  };

  // Determine which classifications are present
  const presentClassifications = cumulativeCounts.map(item => item.classification);

  return (
    <>
      <Header />
      <div className="identify-waste-container">
        <h1 className="identify-waste-title">Identify Waste</h1>
        <form onSubmit={handleSubmit} className="identify-waste-form">
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="drop-zone-label">
              Drop your JPEG/PNG photo or click to upload
            </label>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          {error && <div className="error-message">{error}</div>}

          
          <div className="content-section" style={{ marginTop: '40px' }}>
            {previewUrl && (
              <div className="preview-container">
                <h2 className="preview-title">Image Preview:</h2>
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="image-preview"
                />
              </div>
            )}
            {processedImageUrl && (
              <div className="preview-container">
                <h2 className="preview-title">Processed Image:</h2>
                <img
                  src={processedImageUrl}
                  alt="Processed"
                  className="image-preview"
                />
              </div>
            )}
            {cumulativeCounts.length > 0 && (
              <div className="preview-container">
                <div className="classification-results">
                  <h2 className="preview-title">Total:</h2>
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Classification</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cumulativeCounts.map((item, index) => (
                        <tr key={index}>
                          <td>{item.classification}</td>
                          <td>{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Independent Container for Total Table and Legend */}
                <div className="total-and-legend-container">
                  <div className="legend-container">
                    <h3>Color Information:</h3>
                    <ul>
                      {presentClassifications.includes("E-Waste") && (
                        <li>
                          <span className="legend-color" style={{ backgroundColor: 'rgb(153, 153, 255)' }}></span>
                          E-Waste
                        </li>
                      )}
                      {presentClassifications.includes("Recyclable") && (
                        <li>
                          <span className="legend-color" style={{ backgroundColor: 'rgb(255, 153, 153)'  }}></span>
                          Recyclable
                        </li>
                      )}
                      {presentClassifications.includes("Organic") && (
                        <li>
                          <span className="legend-color" style={{ backgroundColor: 'rgb(153, 255, 153)' }}></span>
                          Organic
                        </li>
                      )}
                      {/* Add more legend items here as needed */}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default IdentifyWaste;
