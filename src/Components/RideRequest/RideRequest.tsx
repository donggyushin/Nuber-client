import React from "react";
import "./styles.css";
const RideRequest = () => {
  return (
    <div className={"RideReuqest__container"}>
      <div className={"RideReuqest__container__inner"}>
        <div className={"RideReuqest__container__inner__pickUpAddress"}>
          <span
            className={"RideReuqest__container__inner__pickUpAddress__address"}
          >
            Pick Up Address
          </span>
          <span
            className={"RideReuqest__container__inner__pickUpAddress__data"}
          >
            Home!
          </span>
        </div>
        <div className={"RideReuqest__container__inner__dropAddress"}>
          <span className={"RideReuqest__container__inner__dropAddress__title"}>
            Drop Off Address
          </span>
          <span className={"RideReuqest__container__inner__dropAddress__data"}>
            Athens International Airport (ATH), Attiki Odos, Spata Artemia 190
            04 AJ, Greece
          </span>
        </div>
        <div className={"RideReuqest__container__inner__distance"}>
          <span className={"RideReuqest__container__inner__distance__title"}>
            Distance
          </span>
          <span className={"RideReuqest__container__inner__distance__data"}>
            46.1km
          </span>
        </div>
        <div className={"RideReuqest__container__inner__passenger"}>
          <span className={"RideReuqest__container__inner__passenger__title"}>
            Passenger:
          </span>
          <div
            className={"RideReuqest__container__inner__passenger__container"}
          >
            <img
              className={
                "RideReuqest__container__inner__passenger__container__profile"
              }
              src={
                "https://cdn150.picsart.com/upscale-245339439045212.png?r1024x1024"
              }
            />
            <span
              className={
                "RideReuqest__container__inner__passenger__container__name"
              }
            >
              donggyu shin
            </span>
          </div>
        </div>
        <div className={"RideReuqest__container__inner__button__container"}>
          <button className={"RideReuqest__container__inner__button"}>
            ACCEPT RIDE
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideRequest;
