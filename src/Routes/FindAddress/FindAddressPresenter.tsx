import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React from "react";
import { apikey } from "../../googlemap";

class FindAddressPresenter extends React.Component<any> {
  public render() {
    return (
      <div className={"FindAddressPresenter"}>
        <Map google={this.props.google} zoom={14}>
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
}

export default GoogleApiWrapper({
  apiKey: apikey
})(FindAddressPresenter);
