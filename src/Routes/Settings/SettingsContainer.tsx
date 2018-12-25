import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { LOG_USER_OUT, MY_PLACES, USER_PROFILE } from "src/sharedQueries";
import SettingsPresenter from "./SettingsPresenter";

class SettingsContainer extends Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <Query query={USER_PROFILE}>
            {({ loading, error, data }) => {
              if (loading) {
                return "Loading...";
              }
              if (error) {
                return `Error! ${error.message}`;
              }

              const {
                GetMyProfile: {
                  user: { email, fullName, profilePhoto }
                }
              } = data;
              return (
                <Query query={MY_PLACES}>
                  {({ loading: loading2, error: error2, data: data2 }) => {
                    if (loading2) {
                      return "loading....";
                    }
                    if (error2) {
                      return `Error ${error2.message}`;
                    }
                    return (
                      <SettingsPresenter
                        logUserOut={logUserOut}
                        email={email}
                        fullName={fullName}
                        profilePhoto={profilePhoto}
                        places={data2.GetMyPlaces.places}
                        loading={loading2}
                      />
                    );
                  }}
                </Query>
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
