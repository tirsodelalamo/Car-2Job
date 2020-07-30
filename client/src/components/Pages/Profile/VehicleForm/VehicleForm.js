import React, { Component } from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthService from "../../../../service/AuthService";

class VehicleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      model: "",
      fuel: "",
      plate: "",
    };
    this.authService = new AuthService();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };


  handleFormSubmit = (e) => {
      e.preventDefault();
      const userId = this.props.user.loggedInUser._id

      this.props.user.loggedInUser.vehicle ? this.editCar() : this.createCar(userId)

  }

  editCar = () => {  
   
    const carId = this.props.user.loggedInUser.vehicle   
    this.authService
      .editVehicle(carId, this.state)
      .then(() => this.props.handleCar())
      .catch((err) => console.log(err));
  };

  createCar = (userId) => {

    this.authService
    .createVehicle(userId, this.state)
    .then(() => this.props.handleCar())
    .catch((err) => console.log(err));
    
  }

  render() {

    return (
      <>
        <h3>Datos de tu vehículo</h3>
        <hr></hr>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Label>Marca de vehículo</Form.Label>
            <Form.Control
              onChange={this.handleInputChange}
              value={this.state.brand}
              name="brand"
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Modelo de vehículo</Form.Label>
            <Form.Control
              onChange={this.handleInputChange}
              value={this.state.model}
              name="model"
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Matrícula de vehículo</Form.Label>
            <Form.Control
              onChange={this.handleInputChange}
              value={this.state.plate}
              name="plate"
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de combustible empleado</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleInputChange}
              value={this.state.fuel}
              name="fuel"
              type="text"
            >
              <option>Seleccione tipo de combustible</option>
              <option>Diésel</option>
              <option>Gasolina</option>
              <option>Eléctrico</option>
              <option>Híbrido</option>
            </Form.Control>
          </Form.Group>
          <Button variant="dark" type="submit" >
            Aceptar
          </Button>
        </Form>
      </>
    );
  }
}


export default VehicleForm