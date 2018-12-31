import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { MY_PLACES } from "src/sharedQueries";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQueries";

class AddPlaceContainer extends Component<any> {
  public state = {
    address: "",
    lat: 0,
    lng: 0,
    name: ""
  };

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        address: this.props.location.state.address || "",
        lat: this.props.location.state.lat || 0,
        lng: this.props.location.state.lng || 0
      });
    }, 1000);
  }

  public render() {
    const { address, lat, lng, name } = this.state;
    const { handleInputChange } = this;

    return (
      <Mutation
        mutation={ADD_PLACE}
        variables={{ address, lat, lng, name, isFavorite: false }}
        onCompleted={data => {
          console.log(data);
          const {
            AddPlace: { ok, error }
          } = data;
          if (ok) {
            toast.success("Adding place...", {
              position: toast.POSITION.BOTTOM_CENTER
            });
            setTimeout(() => {
              this.props.history.push("/places");
            }, 3500);
          } else if (error) {
            toast.info(`Error ${error}`, {
              position: toast.POSITION.BOTTOM_CENTER
            });
          } else {
            toast.error("Fail to add place.. T.T", {
              position: toast.POSITION.BOTTOM_CENTER
            });
          }
        }}
        refetchQueries={[{ query: MY_PLACES }]}
      >
        {(addPlace, { data }) => {
          return (
            <AddPlacePresenter
              address={address}
              name={name}
              handleInputChange={handleInputChange}
              addPlace={addPlace}
              lat={lat}
              lng={lng}
            />
          );
        }}
      </Mutation>
    );
  }

  public handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "name") {
      this.setState({
        ...this.state,
        name: value
      });
    } else {
      this.setState({
        ...this.state,
        address: value
      });
    }
  };
}

export default withRouter(AddPlaceContainer);
