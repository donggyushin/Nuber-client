import { gql } from "apollo-boost";

export const GET_NEARBY_DRIVERS = gql`
  query getNearbyDrivers {
    GetNearbyDrivers {
      ok
      error
      drivers {
        id
        lastLat
        lastLng
      }
    }
  }
`;
