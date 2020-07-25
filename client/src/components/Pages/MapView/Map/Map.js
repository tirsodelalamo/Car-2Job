/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Map extends Component {
  state = {
    center: {
      lat: 40.3925046,
      lng: -3.700465,
    },
    zoom: 14,
    directions: null,
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = this.props.coordenates.origin
    const destination = this.props.coordenates.destination

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
            
          });
          console.log("PERO MIRA ESTO!!!!!",this.state)
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    console.log("ESTADO DEL HIJO",this.state)
    console.log("PROPS DEL HIJO",this.props)
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        center={this.props.coordenates.origin.lat ? this.props.coordenates.origin : this.state.center}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));
    

    return (
<<<<<<< HEAD
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBf8Nlxiwn7uJlN9-H0TWIqQMxIm527UHc",
          }}
          center={
            this.props.coordenates.origin.lat
              ? this.props.coordenates.origin
              : this.state.center
          }
          defaultZoom={this.state.zoom}
        >
          {this.props.coordenates.origin.lat ? (
            <Marker
              lat={this.props.coordenates.origin.lat}
              lng={this.props.coordenates.origin.lng}
              text="My Marker"
            />
          ) : null}

          {this.props.coordenates.destination.lat ? (
            <Marker
              lat={this.props.coordenates.destination.lat}
              lng={this.props.coordenates.destination.lng}
              text="My Marker"
            />
          ) : null}
          <Polyline
            path={[
              { lat: -36.73540441, lng: 144.25178598 },
              { lat: -36.73590441, lng: 134.25178198 },
            ]} //{[this.props.coordenates.origin, this.props.coordenates.destination]} //{pathCoordinates}
            options={{
              strokeColor: "#00ffff",
              strokeOpacity: 0.7,
              strokeWeight: 1,
            }}
          />
        </GoogleMapReact>
=======
      <div>
        <Container>
          <Row>
            <Col sm={6}>
              <GoogleMapExample
                containerElement={<div style={{ height: `500px`, width: "100%" }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col sm={6}>
              {this.state.directions ?
              <div>
                <h2>Detalles de ruta:</h2>
                <hr></hr>              
                <p><strong>Origen:</strong> {this.state.directions.routes[0].legs[0].start_address}</p>
                <p><strong>Destino:</strong> {this.state.directions.routes[0].legs[0].end_address}</p>
                <p><strong>Tiempo:</strong> {this.state.directions.routes[0].legs[0].duration.text}</p>
                <p><strong>Distancia:</strong> {this.state.directions.routes[0].legs[0].distance.text}</p>
                <p><strong>El coste de la ruta es de:</strong> {(this.state.directions.routes[0].legs[0].distance.value * 0.0001).toFixed(2)}€</p>
              </div>
              : null}
            </Col>
          </Row>
        </Container>
>>>>>>> 054c462253394b19e5ca0ba1e9bb99f03b70533c
      </div>
    )
  }
}

<<<<<<< HEAD
export default SimpleMap;
=======
export default Map;
>>>>>>> 054c462253394b19e5ca0ba1e9bb99f03b70533c
