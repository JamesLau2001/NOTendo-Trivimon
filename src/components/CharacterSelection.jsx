import React, { useState } from "react";
import PlayerA from "../../public/CharacterSelection/PlayerA.png";
import PlayerB from "../../public/CharacterSelection/PlayerB.png";
import PlayerC from "../../public/CharacterSelection/PlayerC.png";

const CharacterSelection = ({ setSelectedImage }) => {
  const [selectedImage, setSelectedImageState] = useState(null);

  const toggleImageState = (imageNumber) => {
    setSelectedImageState(imageNumber);
    setSelectedImage(imageNumber);
  };

  return (
    <div className="image-container">
      <div
        onClick={() => toggleImageState("A")}
        className={selectedImage === "A" ? "selected" : ""}
      >
        <img src={PlayerA} alt="Image 1" className="CharImage" />
      </div>

      <div
        onClick={() => toggleImageState("B")}
        className={selectedImage === "B" ? "selected" : ""}
      >
        <img src={PlayerB} alt="Image 2" className="CharImage" />
      </div>

      <div
        onClick={() => toggleImageState("C")}
        className={selectedImage === "C" ? "selected" : ""}
      >
        <img src={PlayerC} alt="Image 3" className="CharImage" />
      </div>
    </div>
  );
};

export default CharacterSelection;
