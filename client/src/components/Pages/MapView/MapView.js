import React, { Component } from "react";
import SimpleMap from "./Map/Map";
import { withScriptjs } from 'react-google-maps'
import LocationSearchInput from "./Autocomplete/InputSelectAuto";
import './MapView.css'

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: {},
      destination: {},
      owner: this.props.loggedInUser._id
    };
  }

  setCoordsOrigin = (coords) => this.setState({ origin: coords });
  setCoordsDestination = (coords) => this.setState({ destination: coords });

  render() {

    const MapLoader = withScriptjs(SimpleMap)

    return (
      <>
        <div className= "container">
          <h1>Crea tu ruta!</h1>
          <LocationSearchInput 
            setCoordsOrigin={this.setCoordsOrigin}
            setCoordsDestination={this.setCoordsDestination}
          />
          <MapLoader originalProps = {this.props} coordenates = {this.state} googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBf8Nlxiwn7uJlN9-H0TWIqQMxIm527UHc" 
          loadingElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </>
    );
  }
}

export default MapView;

