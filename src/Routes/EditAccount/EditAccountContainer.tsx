import axios from "axios";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_PROFILE } from "src/sharedQueries";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

class EditAccountContainer extends Component<any> {
  public state = {
    firstName: "",
    lastName: "",
    profilePhoto: ""
  };
  public render() {
    const { firstName, lastName, profilePhoto } = this.state;
    return (
      <Query
        fetchPolicy={"cache-and-network"}
        query={USER_PROFILE}
        onCompleted={this.setField}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return "loading...";
          } else if (error) {
            return `${error} + ${data}`;
          }
          return (
            <Mutation
              mutation={UPDATE_PROFILE}
              variables={{ firstName, lastName, profilePhoto }}
              refetchQueries={[{ query: USER_PROFILE }]}
              onCompleted={this.afterMutation}
            >
              {(mutation, data2) => {
                return (
                  <EditAccountPresenter
                    handleInput={this.handleInputChange}
                    profilePhoto={this.state.profilePhoto}
                    firstName={firstName}
                    lastName={lastName}
                    submitFN={mutation}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }

  public afterMutation = data => {
    console.log(data);
    if (data.UpdateMyProfile.ok) {
      toast.success("updating...", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      toast.error(data.UpdateMyProfile.error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    setTimeout(() => {
      this.props.history.push("/");
    }, 3300);
  };

  public setField = data => {
    const {
      GetMyProfile: {
        user: { firstName, lastName, profilePhoto }
      }
    } = data;
    this.setState({
      firstName,
      lastName,
      profilePhoto
    });
  };

  public handleInputChange = async event => {
    const {
      target: { name, value, files }
    } = event;
    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", "549695488835179");
      formData.append("upload_preset", "ndp6lsvf");
      formData.append("timestamp", String(Date.now() / 1000));

      const request = await axios.post(
        `https://api.cloudinary.com/v1_1/blog-naver-com-donggyu-00/upload`,
        formData
      );

      const newProfile = request.data.url;
      this.setState({
        ...this.state,
        profilePhoto: newProfile
      });
    }
    if (name === "firstName") {
      this.setState({
        ...this.state,
        firstName: value
      });
    } else if (name === "lastName") {
      this.setState({
        ...this.state,
        lastName: value
      });
    }
  };
}

export default withRouter(EditAccountContainer);
