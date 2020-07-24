import React, { Component } from "react";
import SimpleMap from "./Map/Map";
import LocationSearchInput from "./Autocomplete/InputSelectAuto";

class MapView extends Component {
  constructor() {
    super();
    this.state = {
      origin: {},
      destination: {},
    };
  }

  setCoordsOrigin = (coords) => this.setState({ origin: coords });
  setCoordsDestination = (coords) => this.setState({ destination: coords });

  render() {
    return (
      <>
        <h1>Elige tu ruta!</h1>
        <LocationSearchInput
          setCoordsOrigin={this.setCoordsOrigin}
          setCoordsDestination={this.setCoordsDestination}
        />
        <p>
          Las coordenadas son: Latitude: {this.state.destination.lat} Longitude: {this.state.destination.lng}
        </p>
        {console.log("MIRA ESTO", this.state)}
        <SimpleMap data={this.state}/>
      </>
    );
  }
}

export default MapView;

