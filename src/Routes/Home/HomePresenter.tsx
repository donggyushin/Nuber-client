import React from "react";
import {Helmet} from "react-helmet";
import Sidebar from "react-sidebar";

import "./styles.css";

const HomePresenter = ({ sidebarOpen, onSetSidebarOpen }) => {
  return <div className={"HomePresenter"}>
      <Helmet>
        <title>Ruber | Home</title>
      </Helmet>
      <Sidebar sidebar={<b>
            Sidebar content
          </b>} open={sidebarOpen} onSetOpen={onSetSidebarOpen} 
      styles={{
        sidebar: {
          background: "white", width: "80%", zIndex:10
         } }}
         
          >
        <button onClick={() => onSetSidebarOpen()}>
          Open sidebar
        </button>
      </Sidebar>
    </div>;
};

export default HomePresenter;