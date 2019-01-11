import { gql } from "apollo-boost";

export const GET_CHAT = gql`
  query getChat($chatId: Int!) {
    GetChat(chatId: $chatId) {
      ok
      error
      chat {
        messages {
          id
          text
          user {
            fullName
          }
        }
      }
    }
  }
`;

export const GET_FULLNAME = gql`
  query getMyProfile {
    GetMyProfile {
      ok
      error
      user {
        fullName
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $chatId: Int!) {
    SendMessage(text: $text, chatId: $chatId) {
      ok
      error
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription messageSubscription {
    MessageSubscription {
      id
      text
      user {
        fullName
      }
    }
  }
`;
