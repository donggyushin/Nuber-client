import React, { Component } from "react";
import { Query } from "react-apollo";
import { USER_PROFILE } from "src/sharedQueries";
import HomePresenter from "./HomePresenter";
import { GET_NEARBY_DRIVERS } from "./HomeQueries";

class HomeContainer extends Component {
  public state = {
    drivers: [],
    sidebarOpen: false
  };
  public render() {
    const { drivers, sidebarOpen } = this.state;
    const { onSetSidebarOpen } = this;
    return (
      <Query query={USER_PROFILE}>
        {({ loading, error, data: userProfile }) => {
          if (loading) {
            return "loading...";
          } else if (error) {
            return "There is Error..";
          }

          const isDriving = userProfile.GetMyProfile.user.isDriving;

          return (
            <Query
              query={GET_NEARBY_DRIVERS}
              skip={isDriving}
              onCompleted={this.handleNearbyDrivers}
              pollInterval={1000}
            >
              {() => (
                <HomePresenter
                  sidebarOpen={sidebarOpen}
                  onSetSidebarOpen={onSetSidebarOpen}
                  userProfile={userProfile}
                  drivers={drivers}
                />
              )}
            </Query>
          );
        }}
      </Query>
    );
  }

  public handleNearbyDrivers = data => {
    const drivers = data.GetNearbyDrivers.drivers;
    const ok = data.GetNearbyDrivers.ok;

    if (ok) {
      this.setState({
        ...this.state,
        drivers
      });
    }
  };

  public onSetSidebarOpen = () => {
    this.setState({
      ...this.state,
      sidebarOpen: !this.state.sidebarOpen
    });
  };
}

export default HomeContainer;
