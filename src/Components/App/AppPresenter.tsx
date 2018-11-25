import PropTypes from "prop-types";
import React from "react";


const AppPresenter = ({isLoggedIn}) => (
    <div>
        {isLoggedIn ? "You are in" : "You are out"}
    </div>
)

AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppPresenter;