import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddPlace from "../../Routes/AddPlace";
import ChatContainer from "../../Routes/Chat";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import OutHome from "../../Routes/OutHome";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import SocialLogin from "../../Routes/SocialLogin";
import VerifyPhone from "../../Routes/VerifyPhone";
import "./App.css";

const AppPresenter = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route path={"/"} exact={true} component={Home} />
      <Route path={"/ride/:rideId"} exact={true} component={Ride} />
      <Route path={"/edit-account"} exact={true} component={EditAccount} />
      <Route path={"/settings"} exact={true} component={Settings} />
      <Route path={"/places"} exact={true} component={Places} />
      <Route path={"/add-place"} exact={true} component={AddPlace} />
      <Route path={"/find-address"} exact={true} component={FindAddress} />
      <Route
        path={"/chat/:chatId/:rideId"}
        exact={true}
        component={ChatContainer}
      />
      <Redirect from={"*"} to={"/"} />
    </Switch>
  );
};

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path={"/"} exact={true} component={OutHome} />
      <Route path={"/phone-login"} exact={true} component={PhoneLogin} />
      <Route
        path={"/verify-phone/:number"}
        exact={true}
        component={VerifyPhone}
      />
      <Route path={"/social-login"} exact={true} component={SocialLogin} />
      <Redirect from={"*"} to={"/"} />
    </Switch>
  );
};

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
