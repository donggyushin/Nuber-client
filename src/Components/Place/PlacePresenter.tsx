import React from "react";
import "./styles.css";

const PlacePresenter = ({ name, address, isFav, pressStar, deletePlace }) => (
  <div className={"PlacePresenter__container"}>
    <div onClick={pressStar} className={"PlacePresenter__container__star"}>
      {isFav ? "★" : "☆"}
    </div>
    <div className={"PlacePresenter__container__title"}>
      <span className={"PlacePresenter__container__title__name"}>{name}</span>
      <span className={"PlacePresenter__container__title__detail"}>
        {address}
        <span
          onClick={deletePlace}
          className={"PlacePresenter__container__title__detail__x"}
        >
          x
        </span>
      </span>
    </div>
  </div>
);

export default PlacePresenter;
