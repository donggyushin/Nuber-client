import React from "react";
import { Link } from "react-router-dom";
import BackArrow2 from "src/Components/BackArrow2";
import PlaceContainer from "src/Components/Place";
import "./styles.css";

const PlacesPresenter = ({ places }) => {
  return (
    <div className={"Places__container"}>
      <div className={"Places__container__header"}>
        <BackArrow2 back={"/"} />
        <span className={"Places__container__title"}>Places</span>
      </div>
      <div className={"Places__container__innercontainer"}>
        <WayToAddPlaces />
        <div className={"Places__container__innercontainer__div"} />
        {places.length !== 0 &&
          places.map(place => {
            return (
              <PlaceContainer
                key={place.id}
                id={place.id}
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
  return (
    <Link
      className={"Places__container__innercontainer__link"}
      to={"/add-place"}
    >
      Add some places!
    </Link>
  );
};

export default PlacesPresenter;
