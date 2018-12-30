import Geocode from "react-geocode";
import { toast } from "react-toastify";
import { apikey } from "./googlemap";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(apikey);

Geocode.enableDebug();

export const getAddressFromLatLng = async (lat, lng) => {
  const formattedAddress = await Geocode.fromLatLng(lat, lng).then(
    response => {
      const address = response.results[0].formatted_address;

      return address;
    },
    error => {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return "Fail to find address";
    }
  );
  return formattedAddress;
};

export const getLatLngFromAddress = address => {
  Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    error => {
      console.log(error);
    }
  );
};
