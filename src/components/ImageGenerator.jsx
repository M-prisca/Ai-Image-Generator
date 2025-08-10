import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.jpg";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const inputRef = useRef(null);

  const generateImage = async () => {
    const prompt = inputRef.current?.value.trim();

    if (!prompt) {
      alert("Please enter a description.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // or process.env.REACT_APP_API_KEY if CRA
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "512x512",
          }),
        }
      );

      const data = await response.json();
      console.log("OpenAI response:", data);

      if (data.error) {
        alert(`OpenAI API error: ${data.error.message}`);
        return;
      }

      if (data.data && data.data.length > 0) {
        setImage_url(data.data[0].url);
      } else {
        alert("No image returned from API.");
      }
    } catch (error) {
      alert("Request failed: " + error.message);
    }
  };

  return (
    <div className="image-generator">
      <div className="header">
        Ai image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={image_url === "/" ? default_image : image_url}
            alt="Generated"
          />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div className="generate-btn" onClick={generateImage}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
