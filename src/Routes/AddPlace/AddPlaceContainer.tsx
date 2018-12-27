import React, { Component } from "react";
import AddPlacePresenter from "./AddPlacePresenter";

class AddPlaceContainer extends Component {
  public state = {
    address: "",
    name: ""
  };

  public render() {
    const { address, name } = this.state;
    const { handleInputChange } = this;
    return (
      <AddPlacePresenter
        address={address}
        name={name}
        handleInputChange={handleInputChange}
      />
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

export default AddPlaceContainer;
