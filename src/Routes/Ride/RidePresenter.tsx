import React from "react";
import "./styles.css";
const RidePresenter = () => {
  return (
    <div className={"RidePresenter"}>
      <div className={"RidePresenter__line"}>
        <div className={"RidePresenter__Profile__container"}>
          <div className={"RidePresenter__Profile__container__Row"}>
            <span className={"RidePresenter__Profile__container__Row__span"}>
              Passenger
              <div className={"RidePresenter__Profile__container__Row__data"}>
                <img
                  src={"https://i.ytimg.com/vi/IwrpEGy40N8/maxresdefault.jpg"}
                  className={
                    "RidePresenter__Profile__container__Row__data__img"
                  }
                />
                <span
                  className={
                    "RidePresenter__Profile__container__Row__data__fullName"
                  }
                >
                  full Name
                </span>
              </div>
            </span>
          </div>
          <div className={"RidePresenter__Profile__container__Row"}>
            <span className={"RidePresenter__Profile__container__Row__span"}>
              Driver
              <div className={"RidePresenter__Profile__container__Row__data"}>
                <img
                  src={"https://i.ytimg.com/vi/IwrpEGy40N8/maxresdefault.jpg"}
                  className={
                    "RidePresenter__Profile__container__Row__data__img"
                  }
                />
                <span
                  className={
                    "RidePresenter__Profile__container__Row__data__fullName"
                  }
                >
                  full Name
                </span>
              </div>
            </span>
          </div>
        </div>
        <div className={"RidePresenter__Address"}>
          <div className={"RidePresenter__Address__From"}>
            <span className={"RidePresenter__Address__From__span"}>From</span>
            <span className={"RidePresenter__Address__From__pickUpAddress"}>
              Pick Up Address
            </span>
          </div>
          <div className={"RidePresenter__Address__From"}>
            <span className={"RidePresenter__Address__From__span"}>To</span>
            <span className={"RidePresenter__Address__From__pickUpAddress"}>
              Drop Off Address
            </span>
          </div>
        </div>
        <div className={"RidePresenter__Profile__container__distance_info"}>
          <div
            className={
              "RidePresenter__Profile__container__distance_info__distance"
            }
          >
            <span
              className={
                "RidePresenter__Profile__container__distance_info__distance__span"
              }
            >
              Distance
            </span>
            <span
              className={
                "RidePresenter__Profile__container__distance_info__distance__data"
              }
            >
              10 km
            </span>
          </div>
          <div
            className={
              "RidePresenter__Profile__container__distance_info__distance"
            }
          >
            <span
              className={
                "RidePresenter__Profile__container__distance_info__distance__span"
              }
            >
              Duration
            </span>
            <span
              className={
                "RidePresenter__Profile__container__distance_info__distance__data"
              }
            >
              10 mins
            </span>
          </div>
        </div>
        <div className={"RidePresenter__Profile__container__status"}>
          <span className={"RidePresenter__Profile__container__status__span"}>
            Status
          </span>
          <span className={"RidePresenter__Profile__container__status__data"}>
            REQUESTING
          </span>
        </div>
        <div className={"RidePresenter__Profile__container__button"}>
          <button
            className={"RidePresenter__Profile__container__button__button"}
          >
            Pick Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePresenter;
