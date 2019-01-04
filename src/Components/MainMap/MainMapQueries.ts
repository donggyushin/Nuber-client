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
