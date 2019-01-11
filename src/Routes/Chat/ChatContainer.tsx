import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import ChatPresenter from "./ChatPresenter";

import {
  GET_CHAT,
  GET_FULLNAME,
  MESSAGE_SUBSCRIPTION,
  SEND_MESSAGE
} from "./ChatQueries";

class ChatContainer extends Component<any> {
  public state = {
    chatId: 0,
    message: "",
    rideId: 0
  };

  public sendMessageMutation;

  public componentDidMount() {
    const { rideId, chatId } = this.props.match.params;

    if (rideId) {
      this.setState({ ...this.state, rideId: parseInt(rideId, 10) });
    }
    if (chatId) {
      this.setState({
        ...this.state,
        chatId: parseInt(chatId, 10)
      });
    }
  }

  public render() {
    return (
      <Query query={GET_CHAT} variables={{ chatId: this.state.chatId }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return "loading";
          }
          if (error) {
            return `Error! ${error.message}`;
          }

          const subscribeToNewChat = () =>
            subscribeToMore({
              document: MESSAGE_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                const newMessage = subscriptionData.data.MessageSubscription;
                const messagess = prev.GetChat.chat.messages;
                const latestMessageId = messagess[messagess.length - 1].id;
                if (newMessage.id === latestMessageId) {
                  return;
                }

                return Object.assign({}, prev, {
                  GetChat: {
                    ...prev.GetChat,
                    chat: {
                      messages: [...prev.GetChat.chat.messages, newMessage]
                    }
                  }
                });
              }
            });

          subscribeToNewChat();

          const chat = data.GetChat.chat;
          const messages = chat.messages;

          return (
            <Query query={GET_FULLNAME}>
              {({ loading: getProfileLoading, data: fullNameData }) => {
                if (getProfileLoading) {
                  return "Loading...";
                }
                const fullName = fullNameData.GetMyProfile.user.fullName;
                return (
                  <Mutation mutation={SEND_MESSAGE}>
                    {sendMessage => {
                      this.sendMessageMutation = sendMessage;
                      return (
                        <ChatPresenter
                          messages={messages}
                          clickFinishButton={this.finishChat}
                          fullName={fullName}
                          handleInput={this.handleInputString}
                          handlePress={this.PressEnter}
                          text={this.state.message}
                        />
                      );
                    }}
                  </Mutation>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }

  public PressEnter = event => {
    const { chatId, message } = this.state;
    if (event.key === "Enter") {
      this.sendMessageMutation({ variables: { chatId, text: message } });
      this.setState({
        ...this.state,
        message: ""
      });
    }
  };

  public handleInputString = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      message: value
    });
  };

  public finishChat = () => {
    const { rideId } = this.props.match.params;
    window.location.href = `/ride/${rideId}`;
  };
}

export default ChatContainer;
