import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";
import { compose, graphql } from "react-apollo";
import { toast } from "react-toastify";
import { getLatLngFromAddress } from "src/geocode";
import { apikey } from "../../googlemap";
import AddressBar from "../AddressBar";
import PickAddress from "../PickAddress";
import RequestButton from "../RequestButton";
import { REPORT_LOCATION } from "./MainMapQueries";
import "./styles.css";

class MainMap extends React.Component<any> {
  public state = {
    address: "",
    centerLat: 0,
    centerLng: 0,
    directions: null,
    distance: "0 km",
    dstLat: 0,
    dstLng: 0,
    duration: "0 mins",
    initialLat: 0,
    initialLng: 0,
    lat: 0,
    lng: 0,
    loading: true,
    zoom: 14
  };

  public bounds;
  public map;
  public directions;

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
      distance,
      duration,
      initialLat,
      initialLng,
      lat,
      lng,
      loading,
      zoom
    } = this.state;

    if (loading) {
      return "Loading...";
    } else {
      return (
        <Map
          google={this.props.google}
          zoom={zoom}
          initialCenter={{ lat: initialLat, lng: initialLng }}
          bounds={this.bounds}
          ref={map => (this.map = map)}
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
          {this.state.distance !== "0 km" && this.state.duration !== "0 mins" && (
            <div className={"MainMap__Request__button"}>
              <RequestButton />
            </div>
          )}

          <div className={"MainMap__pickButton"}>
            <PickAddress clickThisButton={this.clickPickButton} />
          </div>
          <div className={"MainMap__info"}>
            <span className={"MainMap__info__item"}>distance: {distance}</span>
            <span className={"MainMap__info__item"}>duration: {duration}</span>
          </div>
        </Map>
      );
    }
  }

  public clickPickButton = async () => {
    const { address, lat, lng } = this.state;
    const coords = await getLatLngFromAddress(address);
    if (!coords) {
      toast.error("Fail to get Location", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      this.bounds = new this.props.google.maps.LatLngBounds();
      this.bounds.extend({ lat, lng });
      this.bounds.extend({ lat: coords.lat, lng: coords.lng });
      this.setState({
        ...this.state,
        address: coords.formattedAddress,
        dstLat: coords.lat,
        dstLng: coords.lng
      });
      const DirectionService = new this.props.google.maps.DirectionsService();
      const renderOptions = {
        polylineOptions: {
          strokeColor: "#000"
        },
        suppressMarkers: true
      };
      this.directions = new this.props.google.maps.DirectionsRenderer(
        renderOptions
      );

      DirectionService.route(
        {
          destination: new this.props.google.maps.LatLng(
            coords.lat,
            coords.lng
          ),
          origin: new this.props.google.maps.LatLng(lat, lng),
          travelMode: this.props.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === this.props.google.maps.DirectionsStatus.OK) {
            const {
              distance: { text: distance },
              duration: { text: duration }
            } = result.routes[0].legs[0];
            this.setState({
              ...this.state,
              distance,
              duration
            });
            this.directions.setDirections(result);
            this.directions.setMap(this.map.map);
          } else {
            toast.error("fail");
          }
        }
      );
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
    const { reportLocation } = this.props;
    const lat = latitude;
    const lng = longitude;
    this.setState({
      ...this.state,
      lat,
      lng
    });
    reportLocation({
      variables: {
        lat,
        lng
      }
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
      lat,
      lng,
      loading: false
    });
  };
}

const LoadingContainer = props => {
  return <div className={"LoadingContainer"}>Loading....</div>;
};

export default GoogleApiWrapper({ apiKey: apikey, LoadingContainer })(
  compose(graphql(REPORT_LOCATION, { name: "reportLocation" }))(MainMap)
);
