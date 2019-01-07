import React from "react";
import "./styles.css";
const RideRequest = ({ rideRequest, acceptRide }) => {
  const {
    dropOffAddress,
    pickUpAddress,
    status,
    distance,
    duration,
    id
  } = rideRequest;
  const passenger = rideRequest.passenger;
  const { fullName, profilePhoto } = passenger;
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
            {pickUpAddress}
          </span>
        </div>
        <div className={"RideReuqest__container__inner__dropAddress"}>
          <span className={"RideReuqest__container__inner__dropAddress__title"}>
            Drop Off Address
          </span>
          <span className={"RideReuqest__container__inner__dropAddress__data"}>
            {dropOffAddress}
          </span>
        </div>
        <div className={"RideReuqest__container__inner__distance"}>
          <span className={"RideReuqest__container__inner__distance__title"}>
            Distance
          </span>
          <span className={"RideReuqest__container__inner__distance__data"}>
            {distance}
          </span>
        </div>
        <div className={"RideReuqest__container__inner__duration"}>
          <span className={"RideReuqest__container__inner__duration__title"}>
            Duration
          </span>
          <span className={"RideReuqest__container__inner__duration__data"}>
            {duration}
          </span>
        </div>
        <div className={"RideReuqest__container__inner__status"}>
          <span className={"RideReuqest__container__inner__status__title"}>
            Status
          </span>
          <span className={"RideReuqest__container__inner__status__data"}>
            {status}
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
                profilePhoto
                  ? profilePhoto
                  : "https://cdn150.picsart.com/upscale-245339439045212.png?r1024x1024"
              }
            />
            <span
              className={
                "RideReuqest__container__inner__passenger__container__name"
              }
            >
              {fullName}
            </span>
          </div>
        </div>
        <div className={"RideReuqest__container__inner__button__container"}>
          <button
            className={"RideReuqest__container__inner__button"}
            disabled={status !== "REQUESTING"}
            onClick={() => {
              acceptRide({ variables: { rideId: id } });
            }}
          >
            {status === "REQUESTING"
              ? "ACCEPT RIDE"
              : `This Ride Request's status is ${status}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideRequest;
