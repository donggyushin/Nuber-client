import React from "react";
import "./styles.css";

const PlacePresenter = () => (
  <div className={"PlacePresenter__container"}>
    <div className={"PlacePresenter__container__star"}>★</div>
    <div className={"PlacePresenter__container__title"}>
      <span className={"PlacePresenter__container__title__name"}>Home</span>
      <span className={"PlacePresenter__container__title__detail"}>12345</span>
    </div>
  </div>
);

export default PlacePresenter;
