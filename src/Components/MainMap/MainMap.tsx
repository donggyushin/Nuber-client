import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";
import { apikey } from "../../googlemap";

class MainMap extends React.Component<any> {
  public state = {
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
    const { initialLat, initialLng, lat, lng, loading } = this.state;

    if (loading) {
      return "Loading...";
    } else {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: initialLat,
            lng: initialLng
          }}
          center={
            lat !== 0 && lng !== 0
              ? {
                  lat,
                  lng
                }
              : {
                  lat: initialLat,
                  lng: initialLng
                }
          }
        >
          <Marker
            name={"Current Location"}
            title={"Current Location"}
            position={
              lat !== 0 && lng !== 0
                ? { lat, lng }
                : {
                    lat: initialLat,
                    lng: initialLng
                  }
            }
          />
        </Map>
      );
    }
  }

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
