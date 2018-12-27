import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { MY_PLACES } from "src/sharedQueries";
import PlacePresenter from "./PlacePresenter";
import { TOGGLE_FAV } from "./PlaceQueries";

class PlaceContainer extends Component<any> {
  public render() {
    const { name, address, isFav, id } = this.props;
    return (
      <Mutation
        mutation={TOGGLE_FAV}
        variables={{ id, isFavorite: !isFav }}
        refetchQueries={[{ query: MY_PLACES }]}
      >
        {(toggleFav, { data }) => {
          console.log(data);
          return (
            <PlacePresenter
              name={name}
              pressStar={toggleFav}
              address={address}
              isFav={isFav}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default PlaceContainer;
