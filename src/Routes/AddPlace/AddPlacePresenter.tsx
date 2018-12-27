import React from "react";
import { Link } from "react-router-dom";
import BackArrow2 from "src/Components/BackArrow2";
import "./styles.css";

const AddPlacePresenter = ({ address, name, handleInputChange, addPlace }) => {
  return (
    <div className={"AddPlacePresenter"}>
      <div className={"AddPlacePresenter__header"}>
        <BackArrow2 back={"/"} />
        <span className={"AddPlacePresenter__header__title"}>Add Place</span>
      </div>
      <div className={"AddPlacePresenter__container"}>
        <input
          className={"AddPlacePresenter__container__input"}
          placeholder={"Name"}
          name={"name"}
          value={name}
          onChange={handleInputChange}
        />
        <input
          className={"AddPlacePresenter__container__input"}
          placeholder={"Address"}
          name={"address"}
          value={address}
          onChange={handleInputChange}
        />
        <div className={"AddPlacePresenter__container__link"}>
          <Link to={"/find-address"}>Find address from map</Link>
        </div>
        <button
          className={"AddPlacePresenter__container__button"}
          onClick={addPlace}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddPlacePresenter;
