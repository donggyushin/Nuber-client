import React from "react";
import BackArrow from 'src/Components/BackArrow';
import countries from "src/countries";
import "./styles.css";

const PhoneLoginPresenter = () => (
  <div className={"PhoneLogin_container"}>
    <div className={"PhoneLogin_container_Arrow"}>
      <BackArrow back={"/"} />
    </div>
    <span className={"PhoneLogin_container_span"}>
        Enter your phone number
    </span>
    <select className={"PhoneLogin_container_select"}>
        {countries.map((country, index) =>{
        
                if (country.name ==="Korea, Republic of South Korea"){
            return (
                <option value={country.dial_code} key={index}
                selected={true}
                >
                    {country.flag} {country.name} ({country.dial_code})
            </option>
            )
        }else {
            return (

                <option value={country.dial_code} key={index}>
                    {country.flag} {country.name} ({country.dial_code})
            </option>
            )
        }
        })}
        
    </select>
        <input placeholder={"4038 1009"} className={"PhoneLogin_container_input"} />
  </div>
);

export default PhoneLoginPresenter;