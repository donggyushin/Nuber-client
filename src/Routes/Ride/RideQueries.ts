import { gql } from "apollo-boost";

export const RIDE_QUERY = gql`
  query getRide($rideId: Int!) {
    GetRide(rideId: $rideId) {
      ok
      error
      ride {
        id
        status
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
