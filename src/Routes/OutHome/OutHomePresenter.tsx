import React from "react";
import {Link} from "react-router-dom";
import "./styles.css";

const OutHomePresenter = () => (
  <div className="outhome__container">
    <header>
      <div className={"outhome__logo"}>
        <span className={"outhome__title"}>Nuber</span>
      </div>
    </header>
    <footer>
      <div className={"outhome__phoneLogin"}>
        <span className={"outhome__substitle"}>Get moving with Nuber</span>
        <div>
                    <span>🇰🇷 +82</span>
          <input
            className={"fakeInput"}
            placeholder={"Enter your mobile number"}
          />
        </div>
      </div>
      <div className={"outhome__SocialLogin"}>
        <Link to={"phone-login"}>Or connect with socal</Link>
      </div>
    </footer>
  </div>
);

export default OutHomePresenter;