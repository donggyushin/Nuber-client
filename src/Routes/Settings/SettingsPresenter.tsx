import React from "react";
import BackArrow2 from "src/Components/BackArrow2";
import PlacePresenter from "src/Components/Place";
import "./styles.css";

const SettingsPresenter = ({ logUserOut }) => (
  <div className={"Settings__container"}>
    <div className={"settings__container__header"}>
      <BackArrow2 back={"/"} />
      <span className={"settings__container__header__span"}>
        Account Settings
      </span>
    </div>
    <div className={"settings__container__profile"}>
      <img
        className={"settings__container__profile__img"}
        src={
          "https://i.pinimg.com/originals/53/54/f7/5354f750a2816333f42efbeeacb4e244.jpg"
        }
      />
      <div className={"settings__container__profile__name"}>
        <span className={"settings__container__profile__name__name"}>
          Rontend
        </span>
        <span className={"settings__container__profile__name__email"}>
          donggyu9410@gmail.com
        </span>
      </div>
    </div>
    <div className={"settings__container__places__container"}>
      <PlacePresenter />
      <PlacePresenter />
      <PlacePresenter />
    </div>
    <div className={"settings__container__logout__container"}>
      <span onClick={logUserOut} className={"settings__container__logout"}>
        Log Out
      </span>
    </div>
  </div>
);

export default SettingsPresenter;
