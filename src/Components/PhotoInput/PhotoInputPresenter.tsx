import React from "react";
import "./styles.css";

const PhotoInputPresenter = ({ profilePhoto, handleInput }) => {
  
  return (
    <div className={"PhotoInput__container"}>
      <input
        type={"file"}
        className={"PhotoInput__container__input"}
        accept={".jpg, .jpeg, .png"}
        onChange={handleInput}
              name={"profilePhoto"}
      />
      <img
        className={"PhotoInput__container__img"}
        src={
          profilePhoto
                ? profilePhoto
            : "https://feedback.seekingalpha.com/s/cache/01/3a/013a61fd1215d3a8dcbf295b78cf4e74.png"
        }
      />
    </div>
  );
};

export default PhotoInputPresenter;