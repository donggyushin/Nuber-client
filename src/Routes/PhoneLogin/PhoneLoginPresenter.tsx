import React from "react";
import BackArrow from 'src/Components/BackArrow';
import countries from "src/countries";
import "./styles.css";

const PhoneLoginPresenter = ({
  dial_code,
  phone_number,
  onInputChange,
  onSubmit
}) => (
  <div className={"PhoneLogin_container"}>
    <div className={"PhoneLogin_container_Arrow"}>
      <BackArrow back={"/"} />
    </div>
    <span className={"PhoneLogin_container_span"}>Enter your phone number</span>
    <select
      className={"PhoneLogin_container_select"}
      value={dial_code}
      name={"dial_code"}
      onChange={onInputChange}
    >
      {countries.map((country, index) => {
        return (
          <option value={country.dial_code} key={index}>
            {country.flag} {country.name} ({country.dial_code})
          </option>
        );
      })}
    </select>
            <form onSubmit={onSubmit} className={"PhoneLogin_container_form"}>
      <input
        placeholder={"4038 1009"}
        value={phone_number}
        className={"PhoneLogin_container_input"}
        name={"phone_number"}
        onChange={onInputChange}
      />
      <button className={"PhoneLogin_container_button"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" />
        </svg>
      </button>
    </form>
  </div>
);

export default PhoneLoginPresenter;