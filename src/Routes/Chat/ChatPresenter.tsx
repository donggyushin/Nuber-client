import React from "react";
import MyMessagePresenter from "src/Components/MyMessage";
import OpponentMessagePresenter from "src/Components/OpponentMessage";
import "./styles.css";

const ChatPresenter = ({
  clickFinishButton,
  messages,
  fullName,
  handleInput,
  handlePress,
  text
}) => {
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
      <div className={"ChatPresenter__body"} id={"chat__body"}>
        {messages.map(message => {
          if (fullName === message.user.fullName) {
            return (
              <div className={"ChatPresenter__body__my"}>
                <MyMessagePresenter key={message.id} text={message.text} />
              </div>
            );
          } else {
            return (
              <div className={"ChatPresenter__body__opponent"}>
                <OpponentMessagePresenter
                  key={message.id}
                  text={message.text}
                />
              </div>
            );
          }
        })}
      </div>
      <div className={"ChatPresenter__bottom"}>
        <input
          className={"ChatPresenter__bottom__input"}
          placeholder={"Gyu Talk!"}
          value={text}
          onChange={handleInput}
          onKeyPress={handlePress}
        />
      </div>
    </div>
  );
};

export default ChatPresenter;
