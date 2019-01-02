import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE } from "src/sharedQueries";
import MenuPresenter from "./MenuPresenter";
import { TOGGLE_DRIVING } from "./MenuQueries";

class MenuContainer extends Component {
  public render() {
    return (
      <Mutation
        mutation={TOGGLE_DRIVING}
        refetchQueries={[{ query: USER_PROFILE }]}
      >
        {mutation => {
          return (
            <Query query={USER_PROFILE}>
              {({ loading, error, data }) => {
                if (loading) {
                  return "loading...";
                } else if (error) {
                  return "There is error...";
                } else {
                  return (
                    <MenuPresenter
                      toggleDriving={() => {
                        mutation();
                        location.reload();
                      }}
                      name={data.GetMyProfile.user.fullName}
                      driving={data.GetMyProfile.user.isDriving}
                      profile={data.GetMyProfile.user.profilePhoto}
                    />
                  );
                }
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default MenuContainer;
