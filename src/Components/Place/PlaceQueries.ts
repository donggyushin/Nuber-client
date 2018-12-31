import { gql } from "apollo-boost";

export const TOGGLE_FAV = gql`
  mutation editPlace($id: Int!, $isFavorite: Boolean) {
    EditPlace(id: $id, isFavorite: $isFavorite) {
      ok
      error
    }
  }
`;

export const DELETE_PLACE = gql`
  mutation deletePlace($placeId: Int!) {
    DeletePlace(placeId: $placeId) {
      ok
      error
    }
  }
`;
