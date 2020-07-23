import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './../Marker/Marker'
 
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.3925046,
      lng: -3.700465,
    },
    zoom: 14,
  };

  render() {
    return (

      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBf8Nlxiwn7uJlN9-H0TWIqQMxIm527UHc",
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={40.3925046} lng={-3.700465} text="My Marker" />
          <Marker lat={40.3945398} lng={-3.6984026} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;
