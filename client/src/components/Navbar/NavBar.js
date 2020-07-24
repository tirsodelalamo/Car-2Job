import React, {Component} from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthService from './../../service/AuthService'

import {  NavLink } from 'react-router-dom'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.AuthService = new AuthService()

    }

    logout = () => {
      this.AuthService
        .logout()
        .then(() => {
          this.props.setTheUser(false)
        })
        .catch(err => console.log(err))
    }



    render() {
      
      //console.log(this.props)
        
        return (
          <>
            <Navbar bg="dark" variant="dark" sticky="top">
              <Navbar.Brand>
                <NavLink to="/" activeStyle={{ color: 'white' }}>Car2Job</NavLink>
              </Navbar.Brand>
                <Nav className="ml-auto">
                  <Nav.Link as="span">
                    <NavLink to="/" exact activeStyle={{ color: 'white' }}>Inicio</NavLink>
                  </Nav.Link>

                  {this.props.loggedInUser ?
                  
                    (
                      <>
                        {this.props.loggedInUser.role === "Pasajero" ?
                        <Nav.Link as="span">
                          <NavLink to="/mapa" activeStyle={{ color: 'white' }}>Vista usuario</NavLink>
                        </Nav.Link>
                        : null}
                        {this.props.loggedInUser.role === "Conductor" ?
                        <Nav.Link as="span">
                          <NavLink to="/conductor" activeStyle={{ color: 'white' }}>Vista conductor</NavLink>
                        </Nav.Link>
                        : null}
                        <Nav.Link as="span">
                          <NavLink to="/perfil" activeStyle={{ color: 'white' }}>Perfil</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                          <span onClick={this.logout}>Cerrar Sesión</span>
                        </Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link as="span">
                          <NavLink to="/login" activeStyle={{ color: 'white' }}>Inicio de sesión</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                          <NavLink to="/signup" activeStyle={{ color: 'white' }}>Registro</NavLink>
                        </Nav.Link>
                      </>
                    )
                  }
                </Nav>
            </Navbar>
          </>
        );
        
    }
}

export default Navigation