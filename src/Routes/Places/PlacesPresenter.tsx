import React from "react";
import { Link } from "react-router-dom";
import BackArrow2 from "src/Components/BackArrow2";
import PlacePresenter from "src/Components/Place";
import "./styles.css";

const PlacesPresenter = ({ places }) => {
  return (
    <div className={"Places__container"}>
      <div className={"Places__container__header"}>
        <BackArrow2 back={"/"} />
        <span className={"Places__container__title"}>Places</span>
      </div>
      <div className={"Places__container__innercontainer"}>
        {places.length === 0 && <WayToAddPlaces />}
        {places.length !== 0 &&
          places.map(place => {
            return (
              <PlacePresenter
                key={place.id}
                name={place.name}
                address={place.address}
                isFav={place.isFavorite}
              />
            );
          })}
      </div>
    </div>
  );
};

const WayToAddPlaces = () => {
  return <Link to={"/add-place"}>Add some places!</Link>;
};

export default PlacesPresenter;
