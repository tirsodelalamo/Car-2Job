import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { Polyline } from 'react-google-maps';
import Marker from './../Marker/Marker'
 
 
class SimpleMap extends Component {

  constructor(){
    super()
    this.state = {
      center: {
        lat: 40.3925046,
        lng: -3.700465,
      },
      zoom: 14
    }

  }


  render() {
    //const pathCoordinates = [this.props.coordenates.origin, this.props.coordenates.destination]

    return (
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBf8Nlxiwn7uJlN9-H0TWIqQMxIm527UHc",
          }}
          
          center={this.props.coordenates.origin.lat ? this.props.coordenates.origin : this.state.center}
  
          defaultZoom={this.state.zoom}
        >
          {this.props.coordenates.origin.lat ?  
          <Marker lat={this.props.coordenates.origin.lat} lng={this.props.coordenates.origin.lng} text="My Marker" /> 
          : null}
          
          {this.props.coordenates.destination.lat ?  
          <Marker lat={this.props.coordenates.destination.lat} lng={this.props.coordenates.destination.lng} text="My Marker" /> 
          : null}
          <Polyline
            path = {[this.props.coordenates.origin, this.props.coordenates.destination]}
            options={{ 
              strokeColor: '#00ffff',
              strokeOpacity: 1,
              strokeWeight: 2
            }}/>
        </GoogleMapReact>

      </div>
    );
  }
}
 
export default SimpleMap;
