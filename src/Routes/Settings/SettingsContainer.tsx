import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOG_USER_OUT } from "src/sharedQueries";
import SettingsPresenter from "./SettingsPresenter";

class SettingsContainer extends Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {(logUserOut, { data }) => (
          <SettingsPresenter logUserOut={logUserOut} />
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
