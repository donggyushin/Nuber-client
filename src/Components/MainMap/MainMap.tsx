import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";
import { compose, graphql, Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import { getAddressFromLatLng, getLatLngFromAddress } from "src/geocode";
import { apikey } from "../../googlemap";
import AddressBar from "../AddressBar";
import PickAddress from "../PickAddress";
import RequestButton from "../RequestButton";
import RideRequest from "../RideRequest";
import {
  ACCEPT_RIDE_REQUEST,
  GET_NEARBY_RIDE,
  REPORT_LOCATION,
  REQEUST_RIDE
} from "./MainMapQueries";
import "./styles.css";

class MainMap extends React.Component<any> {
  public state = {
    address: "",
    centerLat: 0,
    centerLng: 0,
    directions: null,
    distance: "0 km",
    drivers: [
      {
        id: 0,
        lastLat: 0,
        lastLng: 0
      }
    ],
    dstLat: 0,
    dstLng: 0,
    duration: "0 mins",
    foundRide: false,
    fromAddress: "",
    initialLat: 0,
    initialLng: 0,
    isDriving: true,
    lat: 0,
    lng: 0,
    loading: true,
    nearbyRide: {
      dropOffAddress: "",
      id: 0,
      passenger: {
        fullName: "",
        id: 0,
        phoneNumber: "",
        profilePhoto: ""
      },
      pickUpAddress: "",
      status: ""
    },
    requesting: false,
    zoom: 14
  };

  public bounds;
  public map;
  public directions;

  public async componentDidMount() {
    if (navigator.geolocation) {
      console.log("componentDidMount, and there is navigator.geolocation");
      await navigator.geolocation.getCurrentPosition(
        this.successGetCurrentLocation
      );
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

    const { userProfile, drivers } = this.props;
    const isDriving = userProfile.GetMyProfile.user.isDriving;
    this.setState({
      ...this.state,
      drivers,
      isDriving
    });
  }

  public componentWillReceiveProps(nextProps) {
    const drivers = nextProps.drivers;
    this.setState({
      ...this.state,
      drivers
    });
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
      isDriving,
      lat,
      lng,
      loading,
      zoom,
      drivers,
      fromAddress
    } = this.state;

    if (loading) {
      return "Loading...";
    } else {
      return (
        <Mutation
          mutation={REQEUST_RIDE}
          variables={{
            distance,
            dropOffAddress: address,
            dropOffLat: dstLat,
            dropOffLng: dstLng,
            duration,
            pickUpAddress: fromAddress,
            pickUpLat: lat,
            pickUpLng: lng,
            price: 0
          }}
          onCompleted={this.handleRequestRideOnComplete}
        >
          {(requestRide, { data }) => {
            return (
              <Query
                query={GET_NEARBY_RIDE}
                onCompleted={this.handleNearbyRide}
                skip={!this.state.isDriving}
                pollInterval={5000}
              >
                {({ error: nearbyError }) => {
                  if (nearbyError) {
                    return nearbyError;
                  }

                  return (
                    <Mutation
                      mutation={ACCEPT_RIDE_REQUEST}
                      onCompleted={this.acceptRideMutationHandler}
                    >
                      {(
                        acceptRideRequest,
                        { data: acceptRideResponseData }
                      ) => {
                        return (
                          <Map
                            google={this.props.google}
                            zoom={zoom}
                            initialCenter={{ lat: initialLat, lng: initialLng }}
                            bounds={this.bounds}
                            ref={map => (this.map = map)}
                          >
                            {!isDriving && (
                              <div className={"MainMap__address__bar"}>
                                <AddressBar
                                  onAddressChange={this.onInputChange}
                                  address={address}
                                  onBlur={null}
                                />
                              </div>
                            )}

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
                                  url:
                                    "http://maps.google.com/mapfiles/ms/icons/blue.png"
                                }}
                              />
                            )}
                            {drivers &&
                              drivers.map(driver => {
                                if (driver.id !== 0) {
                                  return (
                                    <Marker
                                      key={driver.id}
                                      name={"asd"}
                                      position={{
                                        lat: driver.lastLat,
                                        lng: driver.lastLng
                                      }}
                                      icon={{
                                        url:
                                          "http://maps.google.com/mapfiles/ms/micons/cabs.png"
                                      }}
                                    />
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            {this.state.distance !== "0 km" &&
                              this.state.duration !== "0 mins" && (
                                <div className={"MainMap__Request__button"}>
                                  <RequestButton
                                    onClickFN={requestRide}
                                    requesting={this.state.requesting}
                                  />
                                </div>
                              )}
                            {address !== "" && (
                              <div className={"MainMap__pickButton"}>
                                <PickAddress
                                  clickThisButton={this.clickPickButton}
                                />
                              </div>
                            )}

                            {!isDriving && (
                              <div className={"MainMap__info"}>
                                <span className={"MainMap__info__item"}>
                                  distance: {distance}
                                </span>
                                <span className={"MainMap__info__item"}>
                                  duration: {duration}
                                </span>
                              </div>
                            )}
                            {this.state.isDriving &&
                              this.state.foundRide &&
                              this.state.nearbyRide.id !== 0 && (
                                <div className={"RideRequest_container"}>
                                  <RideRequest
                                    rideRequest={this.state.nearbyRide}
                                    acceptRide={acceptRideRequest}
                                  />
                                </div>
                              )}
                          </Map>
                        );
                      }}
                    </Mutation>
                  );
                }}
              </Query>
            );
          }}
        </Mutation>
      );
    }
  }

  public acceptRideMutationHandler = data => {
    const ok = data.UpdateRideStatus.ok;
    if (ok) {
      toast.success("Accepting ride request...", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      this.setState({
        ...this.state,
        foundRide: false
      });
    } else {
      const error = data.UpdateRideStatus.error;
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  public handleNearbyRide = data => {
    const { GetNearbyRide } = data;
    if (GetNearbyRide.ok) {
      this.setState({
        ...this.state,
        foundRide: true,
        nearbyRide: GetNearbyRide.ride
      });
    } else {
      toast.error(`${GetNearbyRide.error}`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

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
            toast.error(
              "Google routes to points which are close to the roads at least 5 KMs"
            );
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
    console.log("success to get current location");
    console.log("latitude: " + lat);
    console.log("longitude: " + lng);
    this.setState({
      ...this.state,
      initialLat: lat,
      initialLng: lng,
      lat,
      lng,
      loading: false
    });
    this.getFromAddress(lat, lng);
  };

  public getFromAddress = async (lat, lng) => {
    const fromAddress = await getAddressFromLatLng(lat, lng);
    if (fromAddress) {
      this.setState({ ...this.state, fromAddress });
    }
  };

  public handleRequestRideOnComplete = data => {
    const ok = data.RequestRide.ok;
    if (ok) {
      toast.success("You ride was requested! Waiting drivers...", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      this.setState({ ...this.state, requesting: true });
    } else {
      toast.error(`${data.RequestRide.error}`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
}

const LoadingContainer = () => {
  return <div className={"LoadingContainer"}>Loading....</div>;
};

export default GoogleApiWrapper({ apiKey: apikey, LoadingContainer })(
  compose(graphql(REPORT_LOCATION, { name: "reportLocation" }))(MainMap)
);
