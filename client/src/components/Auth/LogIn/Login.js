import React, { Component } from "react";

import AuthService from "../../../service/AuthService";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: undefined
    };
    this.authService = new AuthService();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.authService
      .login(this.state)
      .then((response) => {
        this.props.setTheUser(response.data);
        this.props.history.push("/");
      })
      .catch((err) => this.setState({ errorMessage: err.response.data.message})); 
  };

  render() {
    return (
      <Container as="main">
        <Row>
          <Col md={{ offset: 3, span: 6 }}>
            <h3>Inicio de sesión</h3>

            <hr></hr>

            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group>
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  name="username"
                  type="text"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  name="password"
                  type="password"
                />
              </Form.Group>
              {this.state.errorMessage &&
                <p className = "errorMessage">{this.state.errorMessage}</p>
              }

              <Button variant="dark" type="submit">
                Iniciar sesión
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
