import React, { Component } from "react";
import { Query } from "react-apollo";
import { MY_PLACES } from "src/sharedQueries";
import PlacesPresenter from "./PlacesPresenter";

class PlacesContainer extends Component {
  public render() {
    return (
      <Query query={MY_PLACES} fetchPolicy={"cache-and-network"}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading....";
          }
          if (error) {
            return `Error! ${error.message}`;
          }
          return <PlacesPresenter places={data.GetMyPlaces.places} />;
        }}
      </Query>
    );
  }
}

export default PlacesContainer;
