import React from "react";
import "./styles.css";
const RidePresenter = ({ ride, driver }) => {
  return (
    <div className={"RidePresenter"}>
      <div className={"RidePresenter__line"}>
        <div className={"RidePresenter__Profile__container"}>
          <div className={"RidePresenter__Profile__container__Row"}>
            <span className={"RidePresenter__Profile__container__Row__span"}>
              Passenger
              <div className={"RidePresenter__Profile__container__Row__data"}>
                <img
                  src={
                    ride.passenger.profilePhoto
                      ? ride.passenger.profilePhoto
                      : `https://grid.gograph.com/anonymous-icon-in-blue-circle-with-long-stock-image_gg76552646.jpg`
                  }
                  className={
                    "RidePresenter__Profile__container__Row__data__img"
                  }
                />
                <span
                  className={
                    "RidePresenter__Profile__container__Row__data__fullName"
                  }
                >
                  {ride.passenger.fullName}
                </span>
              </div>
            </span>
          </div>
          {ride.driver && (
            <div className={"RidePresenter__Profile__container__Row"}>
              <span className={"RidePresenter__Profile__container__Row__span"}>
                Driver
                <div className={"RidePresenter__Profile__container__Row__data"}>
                  <img
                    src={
                      ride.driver.profilePhoto
                        ? ride.driver.profilePhoto
                        : `https://grid.gograph.com/anonymous-icon-in-blue-circle-with-long-stock-image_gg76552646.jpg`
                    }
                    className={
                      "RidePresenter__Profile__container__Row__data__img"
                    }
                  />
                  <span
                    className={
                      "RidePresenter__Profile__container__Row__data__fullName"
                    }
                  >
                    {ride.driver.fullName}
                  </span>
                </div>
              </span>
            </div>
          )}
        </div>
        <div className={"RidePresenter__Address"}>
          <div className={"RidePresenter__Address__From"}>
            <span className={"RidePresenter__Address__From__span"}>From</span>
            <span className={"RidePresenter__Address__From__pickUpAddress"}>
              {ride.pickUpAddress}
            </span>
          </div>
          <div className={"RidePresenter__Address__From"}>
            <span className={"RidePresenter__Address__From__span"}>To</span>
            <span className={"RidePresenter__Address__From__pickUpAddress"}>
              {ride.dropOffAddress}
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
              {ride.distance}
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
              {ride.duration}
            </span>
          </div>
        </div>
        <div className={"RidePresenter__Profile__container__status"}>
          <span className={"RidePresenter__Profile__container__status__span"}>
            Status
          </span>
          <span className={"RidePresenter__Profile__container__status__data"}>
            {ride.status}
          </span>
        </div>
        <div className={"RidePresenter__Profile__container__button"}>
          {ride.driver && !driver && (
            <button
              className={"RidePresenter__Profile__container__button__button"}
            >
              MATCHING
            </button>
          )}
          {driver && `Waiting for user response...`}
        </div>
      </div>
    </div>
  );
};

export default RidePresenter;
