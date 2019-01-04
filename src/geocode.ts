import Geocode from "react-geocode";
import { toast } from "react-toastify";
import { apikey } from "./googlemap";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(apikey);

Geocode.enableDebug();

export const getAddressFromLatLng = async (lat, lng) => {
  const formattedAddress = await Geocode.fromLatLng(lat, lng).then(
    response => {
      let address = "";
      if (response.results[0]) {
        address = response.results[0].formatted_address;
      } else {
        address = "Fail to find address";
      }

      return address;
    },
    error => {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return null;
    }
  );
  return formattedAddress;
};

export const getLatLngFromAddress = async address => {
  const location = await Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      const formattedAddress = response.results[0].formatted_address;
      return { lat, lng, formattedAddress };
    },
    error => {
      console.log(error);
      return null;
    }
  );
  return location;
};
