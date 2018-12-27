import React from "react";
import "./styles.css";

const PlacePresenter = ({ name, address, isFav, pressStar }) => (
  <div className={"PlacePresenter__container"}>
    <div onClick={pressStar} className={"PlacePresenter__container__star"}>
      {isFav ? "★" : "☆"}
    </div>
    <div className={"PlacePresenter__container__title"}>
      <span className={"PlacePresenter__container__title__name"}>{name}</span>
      <span className={"PlacePresenter__container__title__detail"}>
        {address}
      </span>
    </div>
  </div>
);

export default PlacePresenter;
