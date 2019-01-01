import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";
import { toast } from "react-toastify";
import { getLatLngFromAddress } from "src/geocode";
import { apikey } from "../../googlemap";
import AddressBar from "../AddressBar";
import PickAddress from "../PickAddress";
import "./styles.css";

class MainMap extends React.Component<any> {
  public state = {
    address: "",
    dstLat: 0,
    dstLng: 0,
    initialLat: 0,
    initialLng: 0,
    lat: 0,
    lng: 0,
    loading: true
  };

  public componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.successGetCurrentLocation);
      const options = {
        enableHighAccuracy: true
      };
      navigator.geolocation.watchPosition(
        this.successWatch,
        this.errorWatch,
        options
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }

  public render() {
    const {
      address,
      dstLat,
      dstLng,
      initialLat,
      initialLng,
      lat,
      lng,
      loading
    } = this.state;

    if (loading) {
      return "Loading...";
    } else {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{ lat: initialLat, lng: initialLng }}
          center={
            lat !== 0 && lng !== 0
              ? { lat, lng }
              : { lat: initialLat, lng: initialLng }
          }
        >
          <div className={"MainMap__address__bar"}>
            <AddressBar
              onAddressChange={this.onInputChange}
              address={address}
              onBlur={null}
            />
          </div>
          <Marker
            name={"Current Location"}
            title={"Current Location"}
            position={
              lat !== 0 && lng !== 0
                ? { lat, lng }
                : { lat: initialLat, lng: initialLng }
            }
          />
          {dstLat !== 0 && dstLng !== 0 && (
            <Marker
              name={"destination"}
              position={{ lat: dstLat, lng: dstLng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue.png"
              }}
            />
          )}
          <div className={"MainMap__pickButton"}>
            <PickAddress clickThisButton={this.clickPickButton} />
          </div>
        </Map>
      );
    }
  }

  public clickPickButton = async () => {
    const { address } = this.state;
    const coords = await getLatLngFromAddress(address);
    if (!coords) {
      toast.error("Fail to get Location", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      this.setState({
        ...this.state,
        address: coords.formattedAddress,
        dstLat: coords.lat,
        dstLng: coords.lng
      });
    }
  };

  public onInputChange = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      address: value
    });
  };

  public successWatch = pos => {
    const { latitude, longitude } = pos.coords;
    const lat = latitude;
    const lng = longitude;
    this.setState({
      ...this.state,
      lat,
      lng
    });
  };
  public errorWatch = err => {
    console.warn(err.code + err.message);
  };

  public successGetCurrentLocation = position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.setState({
      ...this.state,
      initialLat: lat,
      initialLng: lng,
      loading: false
    });
  };
}

const LoadingContainer = props => {
  return <div className={"LoadingContainer"}>Loading....</div>;
};

export default GoogleApiWrapper({ apiKey: apikey, LoadingContainer })(MainMap);
