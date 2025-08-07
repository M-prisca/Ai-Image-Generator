import React from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.jpg";

const ImageGenerator = () => {
  return (
    <div className="image-generator">
      <div className="header">
        Ai image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={default_image} alt="default image" />
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
