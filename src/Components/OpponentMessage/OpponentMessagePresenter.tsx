import React from "react";
import "./styles.css";
const OpponentMessagePresenter = ({ text }) => {
  return (
    <div className={"OpponentMessagePresenter"}>
      <div className={"OpponentMessagePresenter__messagebox"}>{text}</div>
    </div>
  );
};

export default OpponentMessagePresenter;
