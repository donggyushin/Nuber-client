import React from "react";
import "./styles.css";

const RequestButton = ({ onClickFN }) => {
  return (
    <button onClick={onClickFN} className={"RequestButton"}>
      Request Ride
    </button>
  );
};

export default RequestButton;
