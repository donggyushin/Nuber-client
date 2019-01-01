import React from "react";
import "./styles.css";

const PickAddress = ({ clickThisButton }) => {
  return (
    <button onClick={clickThisButton} className={"PickAddress"}>
      Pick Address
    </button>
  );
};

export default PickAddress;
