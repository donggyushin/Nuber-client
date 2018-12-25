import { gql } from "apollo-boost";

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        fullName
        isDriving
        profilePhoto
        firstName
        lastName
        email
      }
    }
  }
`;

export const MY_PLACES = gql`
  query getMyPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFavorite
      }
    }
  }
`;
