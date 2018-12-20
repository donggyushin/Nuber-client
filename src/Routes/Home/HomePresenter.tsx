import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import LogoutButtonPresenter from "src/Components/LogoutButton";
import MenuPresenter from "src/Components/Menu";
import "./styles.css";

const HomePresenter = ({ sidebarOpen, onSetSidebarOpen }) => {
  return (
    <div className={"HomePresenter"}>
      <Helmet>
        <title>Ruber | Home</title>
      </Helmet>

      <Sidebar
        sidebar={<MenuPresenter />}
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        styles={{ sidebar: { background: "white", width: "80%", zIndex: 10 } }}
      >
        <div className={"HomePresenter__container"}>
          <button
            className={"HomePresenter__button"}
            onClick={() => onSetSidebarOpen()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>
          </button>
          <div className={"HomePresenter__container__logo"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z" />
            </svg>
            <span className={"HomePresenter__container__logo__text"}>
              Ruber
            </span>
            <div className={"HomePresenter__container__logo__logout"}>
              <LogoutButtonPresenter />
            </div>
          </div>
        </div>
      </Sidebar>

      <div className={"empty__div"} />
    </div>
  );
};

export default HomePresenter;
