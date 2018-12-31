import React from "react";
import "./styles.css";

const PickButton = ({ pickThisAddress }) => {
  return (
    <div onClick={pickThisAddress} className={"PickButton"}>
      Pick this address
    </div>
  );
};

export default PickButton;
