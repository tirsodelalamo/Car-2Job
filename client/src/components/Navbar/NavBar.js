import React, {Component} from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import AuthService from './../../service/AuthService'

import {  NavLink } from 'react-router-dom'
import './NavBar.css'

class Navigation extends Component {

    constructor(props) {
      super(props)
      
      this.state = { 
        navExpanded: false,
      };

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
  
  setNavExpanded = (expanded) => { 
    this.setState({ navExpanded: expanded });
  }

  setNavClose = () => { 
    this.setState({ navExpanded: false });
  }

    
    render() {
        
      return (
          
          <>
            <Navbar collapseOnSelect expand="lg" className = "customNav " onToggle={this.setNavExpanded} expanded={this.state.navExpanded}>
              <Navbar.Brand href="#home">
              <NavLink to="/" className="brand" style={{ color: 'black' }}>Car2Job</NavLink>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto">
                    <Nav.Link as="span">
                      <NavLink onClick={this.setNavClose} exact to="/" exact style={{ color: 'black' }}>Inicio</NavLink>
                    </Nav.Link>
                    {this.props.loggedInUser ?
                    (
                      <>
                        {this.props.loggedInUser.role === "Pasajero" &&
                        <Nav.Link as="span">
                          <NavLink onClick={this.setNavClose} to="/mapa" style={{ color: 'black' }}>Crea tu ruta</NavLink>
                        </Nav.Link>
                        }
                        {this.props.loggedInUser.role === "Conductor" &&  
                          <Nav.Link as="span">
                            <NavLink onClick={this.setNavClose} to= "/lista-viajes" style={{ color: 'black' }}>Rutas</NavLink>                          
                          </Nav.Link>
                        }
                        <Nav.Link as="span">
                          <NavLink onClick={this.setNavClose} to="/perfil" style={{ color: 'black' }}>Perfil</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                          <NavLink onClick={this.setNavClose} to = "/" ><span onClick={this.logout} style={{ color: 'black' }}>Cerrar Sesión</span></NavLink>
                        </Nav.Link>
                      </>
                    )
                    :(
                      <>
                        <Nav.Link as="span">
                          <NavLink onClick={this.setNavClose} to="/login" style={{ color: 'black' }}>Inicio de sesión</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                          <NavLink onClick={this.setNavClose} to="/signup" style={{ color: 'black' }}>Registro</NavLink>
                        </Nav.Link>
                      </>
                    )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </>
        );
        
    }
}

export default Navigation