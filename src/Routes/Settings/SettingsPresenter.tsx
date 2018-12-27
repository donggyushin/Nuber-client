import React from "react";
import { Link } from "react-router-dom";
import BackArrow2 from "src/Components/BackArrow2";
import PlaceContainer from "src/Components/Place";
import "./styles.css";

const SettingsPresenter = ({
  logUserOut,
  email,
  profilePhoto,
  fullName,
  places,
  loading
}) => (
  <div className={"Settings__container"}>
    <div className={"settings__container__header"}>
      <BackArrow2 back={"/"} />
      <span className={"settings__container__header__span"}>
        Account Settings
      </span>
    </div>
    <div className={"settings__container__profile"}>
      <img className={"settings__container__profile__img"} src={profilePhoto} />
      <div className={"settings__container__profile__name"}>
        <span className={"settings__container__profile__name__name"}>
          {fullName}
        </span>
        <span className={"settings__container__profile__name__email"}>
          {email}
        </span>
      </div>
    </div>
    <div className={"settings__container__places__container"}>
      {places.map(place => {
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
    <div className={"settings__container__logout__container"}>
      <Link to={"/places"}>
        <span className={"settings__container__logout"}>Go To Places</span>
      </Link>
      <span onClick={logUserOut} className={"settings__container__logout"}>
        Log Out
      </span>
    </div>
  </div>
);

export default SettingsPresenter;
