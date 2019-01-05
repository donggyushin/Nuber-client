import React from "react";
import "./styles.css";

const RequestButton = ({ onClickFN, requesting }) => {
  return (
    <button
      onClick={onClickFN}
      disabled={requesting}
      className={requesting ? "RequestingButton" : "RequestButton"}
    >
      {requesting ? "Requesting..." : "Request Ride"}
    </button>
  );
};

export default RequestButton;
