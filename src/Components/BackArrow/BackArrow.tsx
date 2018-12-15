import React from "react";
import {Link} from "react-router-dom";
import "./styles.css"

const BackArrow = ({ back }) => (
  <div className="BackArrow_container">
    <Link to={back}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill-rule="evenodd"
        clip-rule="evenodd"
        className={"BackArrow_container_Arrow"}
        fill="gray"
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
    </Link>
  </div>
);

export default BackArrow;