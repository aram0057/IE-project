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
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

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
          <div className="content-section">
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
          </div>
        </form>
      </div>

      <footer className="footer">
                <p>&copy; 2024 Green Melb. All rights reserved.</p>
                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </nav>
            </footer>
    </>
  );
};

export default IdentifyWaste;
