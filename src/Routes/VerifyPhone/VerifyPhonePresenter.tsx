import React from "react";
import BackArrow2 from 'src/Components/BackArrow2';
import "./styles.css";

const VerifyPhonePresenter = ({handleInput, handleSubmit, code}) => {

    return <div className="VerifyPhoneContainer">
        <div className="VerifyPhoneContainer__nav">
        <BackArrow2 back={"/phone-login"} />
          <span className="VerifyPhoneContainer__nav__span">
            Verify Phone Number
          </span>
        </div>
        <form className={"VerifyPhoneContainer__form"} onSubmit={handleSubmit}>
            <input className={"VerifyPhoneContainer__form__input"} placeholder="Enter Verification Code"
            value={code} onChange={handleInput}
            />
            <button className={"VerifyPhoneContainer__form__button"}>SUBMIT</button>
        </form>
      </div>;
}

export default VerifyPhonePresenter;