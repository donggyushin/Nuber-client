import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const MenuPresenter = ({ driving, toggleDriving, name, profile }) => {
  return (
    <div className={"MenuPresenter__container"}>
      <div className={"MenuPresenter__container__header"}>
        <img
          className={"MenuPresenter__container__header__profile"}
          src={
            profile
              ? profile
              : "data:image/png;base64,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"
          }
        />
        <Link to={"/edit-account"}>
          <div
            className={"MenuPresenter__container__header__profile__container"}
          >
            <span className={"MenuPresenter__container__header__welcome"}>
              WELCOME
            </span>
            <span className={"MenuPresenter__container__header__text"}>
              {name}!
            </span>
          </div>
        </Link>
      </div>
      <div className={"MenuPresenter__container__body"}>
        <div
          id={"firstItem"}
          className={"MenuPresenter__container__body__item"}
        >
          <Link to={"/trips"}>Trips</Link>
        </div>
        <div className={"MenuPresenter__container__body__item"}>
          <Link to={"/settings"}>Settings</Link>
        </div>
        <div
          className={
            driving
              ? [
                  "MenuPresenter__container__body__item",
                  "drivingmode",
                  "true"
                ].join(" ")
              : [
                  "MenuPresenter__container__body__item",
                  "drivingmode",
                  "false"
                ].join(" ")
          }
          onClick={toggleDriving}
        >
          {driving ? "Stop Driving" : "Start Driving"}
        </div>
      </div>
    </div>
  );
};

export default MenuPresenter;
