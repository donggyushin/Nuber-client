import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation reportLocation($lat: Float, $lng: Float) {
    ReportMovement(lng: $lng, lat: $lat) {
      ok
      error
    }
  }
`;
