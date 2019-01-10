import React from "react";
import MyMessagePresenter from "src/Components/MyMessage";
import OpponentMessagePresenter from "src/Components/OpponentMessage";
import "./styles.css";

const ChatPresenter = ({ clickFinishButton }) => {
  return (
    <div className={"ChatPresenter"}>
      <div className={"ChatPresenter__header"}>
        <span className={"ChatPresenter__header__span"}>CHAT</span>
        <button
          onClick={clickFinishButton}
          className={"ChatPresenter__header__button"}
        >
          FINISH CHAT
        </button>
      </div>
      <div className={"ChatPresenter__body"}>
        <div className={"ChatPresenter__body__opponent"}>
          <OpponentMessagePresenter />
        </div>
        <div className={"ChatPresenter__body__my"}>
          <MyMessagePresenter />
        </div>
      </div>
      <div className={"ChatPresenter__bottom"}>
        <input
          className={"ChatPresenter__bottom__input"}
          placeholder={"Gyu Talk!"}
        />
      </div>
    </div>
  );
};

export default ChatPresenter;
