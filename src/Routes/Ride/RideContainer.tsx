import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import RidePresenter from "./RidePresenter";
import { RIDE_QUERY, RIDE_SUBSCRIPTION } from "./RideQueries";

class RideContainer extends Component<any> {
  public state = {
    rideId: 0
  };

  public componentDidMount() {
    const { rideId } = this.props.match.params;
    const { history } = this.props;
    const parsedRideId = parseInt(rideId, 10);
    if (!rideId) {
      history.push("/");
    } else {
      this.setState({
        ...this.state,
        rideId: parsedRideId
      });
    }
  }
  public render() {
    return (
      <Query
        query={RIDE_QUERY}
        variables={{
          rideId: this.state.rideId
        }}
      >
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return `Error! ${error.message}`;
          }

          const ride = data.GetRide.ride;

          const subscribeToNewRide = () => {
            subscribeToMore({
              document: RIDE_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                console.log(subscriptionData.data);
              }
            });
          };

          subscribeToNewRide();

          return <RidePresenter ride={ride} />;
        }}
      </Query>
    );
  }
}

export default withRouter(RideContainer);
