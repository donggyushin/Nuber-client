import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation reportLocation($lat: Float, $lng: Float) {
    ReportMovement(lng: $lng, lat: $lat) {
      ok
      error
    }
  }
`;

export const REQEUST_RIDE = gql`
  mutation requestRide(
    $pickUpAddress: String!
    $pickUpLat: Float!
    $pickUpLng: Float!
    $dropOffAddress: String!
    $dropOffLat: Float!
    $dropOffLng: Float!
    $price: Float!
    $duration: String!
    $distance: String!
  ) {
    RequestRide(
      pickUpAddress: $pickUpAddress
      pickUpLat: $pickUpLat
      pickUpLng: $pickUpLng
      dropOffAddress: $dropOffAddress
      dropOffLat: $dropOffLat
      dropOffLng: $dropOffLng
      price: $price
      duration: $duration
      distance: $distance
    ) {
      ok
      error
      ride {
        id
      }
    }
  }
`;

export const GET_NEARBY_RIDE = gql`
  query getNearbyRide {
    GetNearbyRide {
      ok
      error
      ride {
        id
        status
        distance
        duration
        pickUpAddress
        dropOffAddress
        passenger {
          id
          phoneNumber
          profilePhoto
          fullName
        }
      }
    }
  }
`;

export const ACCEPT_RIDE_REQUEST = gql`
  mutation updateRideRequest($rideId: Int!) {
    UpdateRideStatus(rideId: $rideId, status: ACCEPTED) {
      ok
      error
    }
  }
`;

export const NEARBY_RIDE_SUBSCRIPTION = gql`
  subscription nearbyRideSubscription {
    NearbyRideSubscription {
      id
      status
      distance
      duration
      pickUpAddress
      dropOffAddress
      passenger {
        id
        phoneNumber
        profilePhoto
        fullName
      }
    }
  }
`;
