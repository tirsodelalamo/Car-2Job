/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import MapService from '../../../../service/MapService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 40.3925046,
        lng: -3.700465,
      },
      zoom: 14,
      directions: null,
      arrivalTime: "",
    };
    this.mapService = new MapService();
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = this.props.coordenates.origin;
    const destination = this.props.coordenates.destination;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
          console.log("PERO MIRA ESTO!!!!!", this.state);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  updateUserState = (data) => {
    this.setState({
      arrivalTime: data.arrivalTime || ""
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  
  handleFormSubmit = e => {
    e.preventDefault()
    this.mapService
        .createTravel(this.state)
        .then(() => this.props.history.push('/perfil'))
        .catch(err => console.log(err))
  }

  render() {
    console.log("ESTADO DEL HIJO", this.state);
    console.log("PROPS DEL HIJO", this.props.coordenates.owner);
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        center={
          this.props.coordenates.origin.lat
            ? this.props.coordenates.origin
            : this.state.center
        }
        defaultZoom={13}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <Container>
          <Row>
            <Col sm={6}>
              <GoogleMapExample
                containerElement={
                  <div style={{ height: `500px`, width: "100%" }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col sm={6}>
              {this.state.directions ? (
                <>
                  <div>
                    <h2>Detalles de ruta:</h2>
                    <hr></hr>
                    <p>
                      <strong>Origen:</strong>
                      {this.state.directions.routes[0].legs[0].start_address}
                    </p>
                    <p>
                      <strong>Destino:</strong>
                      {this.state.directions.routes[0].legs[0].end_address}
                    </p>
                    <p>
                      <strong>Tiempo:</strong>
                      {this.state.directions.routes[0].legs[0].duration.text}
                    </p>
                    <p>
                      <strong>Distancia:</strong>
                      {this.state.directions.routes[0].legs[0].distance.text}
                    </p>
                    <p>
                      <strong>El coste de la ruta es de:</strong>
                      {(
                        this.state.directions.routes[0].legs[0].distance.value *
                        0.0001
                      ).toFixed(2)}
                      €
                    </p>
                  </div>
                  <div></div>
                </>
              ) : null}
            </Col>
          </Row>
        </Container>
        <h2>FORMULARIO SUPERSECRETO</h2>

        {this.state.directions ? (
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group>
              <Form.Label>Origen</Form.Label>
              <Form.Control
                value={this.state.directions.routes[0].legs[0].start_address}
                name="origin"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Destino</Form.Label>
              <Form.Control
                value={this.state.directions.routes[0].legs[0].end_address}
                name="destination"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tiempo de Viaje</Form.Label>
              <Form.Control
                value={this.state.directions.routes[0].legs[0].duration.text}
                name="travelTime"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Distancia</Form.Label>
              <Form.Control
                value={this.state.directions.routes[0].legs[0].distance.text}
                name="distance"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Introduce la hora y el día de llegada</Form.Label>
              <Form.Control
                onChange={this.handleInputChange}
                placeholder="Día, Mes, Hora"
                value={this.state.arrivalTime}
                name="arrivalTime"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={(
                  this.state.directions.routes[0].legs[0].distance.value *
                  0.0001
                ).toFixed(2)}
                name="price"
                type="number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Id Usuario </Form.Label>
              <Form.Control
                value={this.props.coordenates.owner}
                name="owner"
                type="text"
              />
            </Form.Group>
            <Button variant="dark" type="submit">Crear ruta</Button>
          </Form>
        ) : null}
      </div>
    );
  }
}

export default Map;

// origin: {
//         type: String
//     },
//     destination: {
//         type: String
//     },
//     travelTime: {
//         type: Number
//     },
//     distance: {
//         type: Number
//     },
//     arrivalTime: {
//         type: String
//     },
//     price: {
//         type: Number
//     },
//     owner: {
//         type: mongoose.ObjectId,
//         ref: "User"
//     },
//     status: {
//         type: String,
//         enum: ['Pendiente', 'En proceso', 'Confirmado'],
//         default: "Pendiente"
//     }
