import React from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import "./styles.css";

const OutHomePresenter = () => (
  <div className="outhome__container">
  <Helmet>
      <title>Login | Ruber</title>
  </Helmet>
    <header>
      <div className={"outhome__logo"}>
        <span className={"outhome__title"}>Ruber</span>
      </div>
    </header>
    <footer>
      <div className={"outhome__phoneLogin"}>
        <span className={"outhome__substitle"}>Get moving with Nuber</span>
        <div>
                    <span>🇰🇷 +82</span>
          
          <div className={"fakeInput"}>
          <Link to={"/phone-login"} className={"outhome__link"}>
                            <span>Enter your mobile number</span>
          </Link>
            
          </div>
        </div>
      </div>
      <div className={"outhome__SocialLogin"}>
        <Link to={"social-login"}>Or connect with socal</Link>
      </div>
    </footer>
  </div>
);

export default OutHomePresenter;