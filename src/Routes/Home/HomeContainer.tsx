import React, { Component } from "react";
import { Query } from "react-apollo";
import { USER_PROFILE } from "src/sharedQueries";
import HomePresenter from "./HomePresenter";
import { GET_NEARBY_DRIVERS } from "./HomeQueries";

class HomeContainer extends Component {
  public state = {
    sidebarOpen: false
  };
  public render() {
    const { sidebarOpen } = this.state;
    const { onSetSidebarOpen } = this;
    return (
      <Query query={USER_PROFILE}>
        {({ loading, error, data: userProfile }) => {
          if (loading) {
            return "loading...";
          } else if (error) {
            return "There is Error..";
          }

          return (
            <Query query={GET_NEARBY_DRIVERS}>
              {() => (
                <HomePresenter
                  sidebarOpen={sidebarOpen}
                  onSetSidebarOpen={onSetSidebarOpen}
                  userProfile={userProfile}
                />
              )}
            </Query>
          );
        }}
      </Query>
    );
  }

  public onSetSidebarOpen = () => {
    this.setState({
      ...this.state,
      sidebarOpen: !this.state.sidebarOpen
    });
  };
}

export default HomeContainer;
