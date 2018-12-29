import React from "react";
import "./styles.css";
const AddressBar = ({ onAddressChange, address, onBlur }) => {
  return (
    <div className={"AddressBar"}>
      <input
        className={"AddressBar__input"}
        onChange={onAddressChange}
        value={address}
        placeholder={"Input Address"}
        onBlur={onBlur}
      />
    </div>
  );
};

export default AddressBar;
