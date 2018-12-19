import React from "react";
import BackArrow2 from 'src/Components/BackArrow2';
import "./styles.css";

const EditAccountPresenter = ({  firstName, lastName,profilePhoto, handleInput, submitFN}) => {
    return <div className={"EditAccount__container"}>
        <div className={"EditAccount__container__BackArrow"}>
          <BackArrow2 back={"/"} />
          <span className={"EditAccount__container__BackArrow__span"}>
            Edit Account
          </span>
        </div>
        <div className={"EditAccount__container__form"}>
            <input onChange={handleInput} value={firstName} className={"EditAccount__container__form__input"} name={"firstName"} placeholder={"First Name"} />
            <input onChange={handleInput} value={lastName} placeholder={"Last name"} name={"lastName"} className={"EditAccount__container__form__input"} />
          <button className={"EditAccount__container__form__button"} onClick={submitFN}>UPDATE</button>
        </div>
      </div>;
}

export default EditAccountPresenter;