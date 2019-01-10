import React, { Component } from "react";
import ChatPresenter from "./ChatPresenter";

class ChatContainer extends Component<any> {
  public state = {
    rideId: 0
  };

  public componentDidMount() {
    const { rideId } = this.props.match.params;
    if (rideId) {
      this.setState({
        ...this.state,
        rideId
      });
    }
  }

  public render() {
    return <ChatPresenter clickFinishButton={this.finishChat} />;
  }

  public finishChat = () => {
    const { rideId } = this.state;
    window.location.href = `/ride/${rideId}`;
  };
}

export default ChatContainer;
