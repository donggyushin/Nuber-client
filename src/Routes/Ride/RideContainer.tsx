import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import RidePresenter from "./RidePresenter";
import {
  DRIVER_CHECKER,
  RIDE_QUERY,
  RIDE_SUBSCRIPTION,
  UPDATE_RIDE
} from "./RideQueries";

class RideContainer extends Component<any> {
  public state = {
    isDriving: true,
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
                const rideId = this.state.rideId;
                const status =
                  subscriptionData.data.RideStatusSubscription.status;
                const chatId =
                  subscriptionData.data.RideStatusSubscription.chatId;
                if (status === "FINISHED") {
                  window.location.href = "/";
                }
                if (status === "ONROUTE") {
                  toast.info("connecting chat....", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
                  setTimeout(() => {
                    window.location.href = `/chat/${chatId}/${rideId}`;
                  }, 3500);
                }
              }
            });
          };

          subscribeToNewRide();

          return (
            <Query
              query={DRIVER_CHECKER}
              onCompleted={this.handleDriverChecker}
              fetchPolicy={"cache-and-network"}
            >
              {() => {
                return (
                  <Mutation mutation={UPDATE_RIDE}>
                    {updateRide => {
                      return (
                        <RidePresenter
                          ride={ride}
                          driver={this.state.isDriving}
                          updateRide={updateRide}
                        />
                      );
                    }}
                  </Mutation>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }

  public handleDriverChecker = data => {
    console.log(data);
    const ok = data.GetMyProfile.ok;
    const error = data.GetMyProfile.error;
    const isDriving = data.GetMyProfile.user.isDriving;
    if (ok) {
      this.setState({
        ...this.state,
        isDriving
      });
    } else {
      toast.error(`Error! ${error}`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
}

export default withRouter(RideContainer);
