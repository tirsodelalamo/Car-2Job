import React, { Component } from 'react'

import MapService from '../../../service/MapService'
import CardDrawer from './CardDrawer/CardDrawer'

import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";



class TravelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travels: undefined,
      currentLatLng: {
        lat: 0,
        lng: 0,
      },
      filterDistance: 0,
      filteredTravels: [],
    };
    this.mapService = new MapService();
  }

  componentDidMount = () => {
    this.loadCards();
    this.getGeoLocation();
    
  };

  loadCards = () => {
    this.mapService
      .getAllTravels()
      .then((response) => this.setState({ travels: response.data }))
      .catch((err) => console.log(err));
  };

  // DETECCIÓN LAT LNG SEGUN GEOLOC. (LLEVAR A VISTA DONDE FILTREMOS)

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        this.setState((prevState) => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }))
      );
    }
  };

  calcDistance = (lat1, lon1, lat2, lon2) => {
    //LAT1 Y LON1 SON COORDENADAS OBTENIDAS POR GEOLOCALIZACION, LAS OTRAS SON DE RUTA (LLEVAR A VISTA DONDE FILTREMOS)
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    console.log("ESTO ES DIST", dist)
    return dist;
  };

  filterTravels = () => {
    let copyTravels = [...this.state.travels]
    const newArray = copyTravels.filter(elm => this.calcDistance(this.state.currentLatLng.lat, this.state.currentLatLng.lng, elm.originCoords.lat, elm.originCoords.lng) < this.state.filterDistance)
    this.setState({filteredTravels: newArray})
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => this.filterTravels());
  };

  render() {

    return (
      <>
        <Container as="main" className="coasters-page">
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>
                <strong>
                  Filtra por distancia al origen de la ruta (en Km)
                </strong>
              </Form.Label>
              <Form.Control as="select" onChange={this.handleInputChange} value={this.state.filterDistance} name="filterDistance" type="number">
                <option>Seleccione rango</option>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>40</option>
                <option>60</option>
                <option>80</option>
                <option>100</option>
                <option value = "40075">Ver todas las rutas</option>
              </Form.Control>
            </Form.Group>
          </Form>
          
          {this.state.travels ? 
          <div>
            <h1>Pasajeros Disponibles</h1>
                {!this.state.filterDistance ? 
                  <CardDrawer
                  travels={this.state.travels.filter(
                    (elm) => elm.owner._id !== this.props.loggedInUser._id
                  )} />
                :
                  <CardDrawer
                  travels={this.state.filteredTravels.filter(
                    (elm) => elm.owner._id !== this.props.loggedInUser._id
                )} />
                }
          </div>
          : <h1>No hay rutas disponibles</h1>  
        }
        </Container>
      </>
    );
  }
}

export default TravelList

//travels.map(elm => elm.filter(calcDistance(this.state.currentLatLng.lat, this.state.currentLatLng.lng, this.originCoords.lat, this.originCoords.lng)<filterdistance))