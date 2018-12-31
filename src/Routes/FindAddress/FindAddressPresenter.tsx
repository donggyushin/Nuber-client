import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import AddressBar from "src/Components/AddressBar";
import PickButton from "src/Components/PickButton";
import { getAddressFromLatLng, getLatLngFromAddress } from "src/geocode";
import { apikey } from "../../googlemap";
import "./styles.css";

class FindAddressPresenter extends React.Component<any> {
  public state = {
    address: "",
    initialLat: 0,
    initialLng: 0,
    lat: 0,
    lng: 0,
    loading: true
  };

  constructor(props) {
    super(props);
    this.centerMoved = this.centerMoved.bind(this);
  }

  public componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.successGetCurrentPosition);
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }

  public render() {
    const { address, initialLat, initialLng, lat, lng, loading } = this.state;
    if (loading) {
      return "loading...";
    }
    return (
      <div className={"FindAddressPresenter"}>
        <div className={"FindAddressPresenter__input"}>
          <AddressBar
            onAddressChange={this.handleAddressBar}
            address={address}
            onBlur={this.onBlur}
          />
        </div>

        <div className={"FindAddressPresenter__pickButton"}>
          <PickButton pickThisAddress={this.pickThisAddress} />
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={"red"}
          className={"FindAddressPresenter__pin"}
        >
          <path d="M12 5c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm10.881-2.501c0-1.492-.739-2.83-1.902-3.748l.741-.752c1.395 1.101 2.28 2.706 2.28 4.5s-.885 3.4-2.28 4.501l-.741-.753c1.163-.917 1.902-2.256 1.902-3.748zm-3.381 2.249l.74.751c.931-.733 1.521-1.804 1.521-3 0-1.195-.59-2.267-1.521-3l-.74.751c.697.551 1.141 1.354 1.141 2.249s-.444 1.699-1.141 2.249zm-16.479 1.499l-.741.753c-1.395-1.101-2.28-2.707-2.28-4.501s.885-3.399 2.28-4.5l.741.752c-1.163.918-1.902 2.256-1.902 3.748s.739 2.831 1.902 3.748zm.338-3.748c0-.896.443-1.698 1.141-2.249l-.74-.751c-.931.733-1.521 1.805-1.521 3 0 1.196.59 2.267 1.521 3l.74-.751c-.697-.55-1.141-1.353-1.141-2.249z" />
        </svg>

        <Map
          google={this.props.google}
          zoom={14}
          center={
            lat === 0 && lng === 0
              ? { lat: initialLat, lng: initialLng }
              : { lat, lng }
          }
          initialCenter={{ lat: initialLat, lng: initialLng }}
          onDragend={this.centerMoved}
        >
          <Marker name={"Current location"} />
          <InfoWindow>
            <div>
              <h1>test</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }

  public centerMoved = async (mapProps, map) => {
    const lat = map.center.lat();
    const lng = map.center.lng();
    this.gettingAddressFromLatLng(lat, lng);
    this.setState({
      ...this.state,
      lat,
      lng
    });
    console.log(this.state);
  };

  public pickThisAddress = () => {
    const { history } = this.props;
    const { address, lat, lng } = this.state;
    history.push({
      pathname: "/add-place",
      state: {
        address,
        lat,
        lng
      }
    });
  };

  public gettingAddressFromLatLng = async (lat, lng) => {
    const address = await getAddressFromLatLng(lat, lng);
    toast.info("Searching...", { position: toast.POSITION.BOTTOM_CENTER });
    this.setState({
      ...this.state,
      address
    });
  };

  public successGetCurrentPosition = position => {
    this.setState({
      ...this.state,
      initialLat: position.coords.latitude,
      initialLng: position.coords.longitude,
      loading: false
    });
    this.gettingAddressFromLatLng(
      position.coords.latitude,
      position.coords.longitude
    );
  };

  public handleAddressBar = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      address: value
    });
  };

  public onBlur = async () => {
    const { address } = this.state;
    const location = await getLatLngFromAddress(address);
    if (!location) {
      toast.error("Fail to find address", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      const { lat, lng, formattedAddress } = location;
      toast.info("Searching....", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      setTimeout(() => {
        this.setState({
          ...this.state,
          address: formattedAddress,
          lat,
          lng
        });
      }, 2500);
    }
  };
}

export default GoogleApiWrapper({
  apiKey: apikey
})(withRouter(FindAddressPresenter));
