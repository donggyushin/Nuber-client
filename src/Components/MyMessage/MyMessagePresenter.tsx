import React from "react";
import "./styles.css";
const MyMessagePresenter = ({ text }) => {
  return (
    <div className={"MyMessagePresenter"}>
      <div className={"MyMessagePresenter__messagebox"}>{text}</div>
    </div>
  );
};

export default MyMessagePresenter;
