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
    console.log(this.state);
    console.log("PROOOOOOOOOOOOOPS", this.props);
    const id = this.props.usuario.loggedInUser._id;

    this.authService
      .createVehicle(id, this.state)
      .then(() => this.props.usuario.history.push("/perfil"))
      .catch((err) => console.log(err));
  };

  render() {
    console.log("Props que busco", this.props);
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
          <Button variant="dark" type="submit" onClick={this.props.onHide}>
            Aceptar
          </Button>
        </Form>
      </>
    );
  }
}


export default VehicleForm