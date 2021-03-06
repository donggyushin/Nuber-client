import { gql } from "apollo-boost";

export const RIDE_QUERY = gql`
  query getRide($rideId: Int!) {
    GetRide(rideId: $rideId) {
      ok
      error
      ride {
        id
        status
        chatId
        pickUpAddress
        dropOffAddress
        duration
        distance
        driver {
          id
          profilePhoto
          fullName
        }
        passenger {
          id
          profilePhoto
          fullName
        }
      }
    }
  }
`;

export const RIDE_SUBSCRIPTION = gql`
  subscription rideStatusSubscription {
    RideStatusSubscription {
      id
      status
      chatId
      pickUpAddress
      dropOffAddress
      duration
      distance
      driver {
        id
        profilePhoto
        fullName
      }
      passenger {
        id
        profilePhoto
        fullName
      }
    }
  }
`;

export const DRIVER_CHECKER = gql`
  query getMyProfile {
    GetMyProfile {
      ok
      error
      user {
        isDriving
      }
    }
  }
`;

export const UPDATE_RIDE = gql`
  mutation updateRideStatus($rideId: Int!, $status: rideStatus!) {
    UpdateRideStatus(rideId: $rideId, status: $status) {
      ok
      error
      id
      chatId
    }
  }
`;
