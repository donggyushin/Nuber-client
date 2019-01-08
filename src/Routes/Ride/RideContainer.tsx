import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RidePresenter from "./RidePresenter";

class RideContainer extends Component<any> {
  public componentDidMount() {
    const { rideId } = this.props.match.params;
    const { history } = this.props;
    if (!rideId) {
      history.push("/");
    }
  }
  public render() {
    return <RidePresenter />;
  }
}

export default withRouter(RideContainer);
