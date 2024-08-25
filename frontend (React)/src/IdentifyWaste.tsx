import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./GlobalStyles.css";
import "./IdentifyWaste.css";

const IdentifyWaste: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textData, setTextData] = useState<string>("");

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

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedImage) {
      console.log("Selected Image:", selectedImage);
    }
    console.log("Text Data:", textData);
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
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default IdentifyWaste;
