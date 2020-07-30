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
      
      this.state = { //OJO
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
  
  setNavExpanded = (expanded) => { //OJO
    this.setState({ navExpanded: expanded });
  }

  setNavClose = () => { //OJO
    this.setState({ navExpanded: false });
  }

    
    render() {
        
        return (
          // <>
          //   <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className = "customNav">
          //     <Navbar.Brand>
          //       <NavLink to="/" style={{ color: 'black' }}>Car2Job</NavLink>
          //     </Navbar.Brand>
          //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          //     <Navbar.Collapse id="responsive-navbar-nav" >
          //       <Nav className="mr-auto">
          //         <Nav.Link as="span">
          //           <NavLink to="/" exact style={{ color: 'black' }}>Inicio</NavLink>
          //         </Nav.Link>

          //         {this.props.loggedInUser ?
                  
          //           (
          //             <>
          //               {this.props.loggedInUser.role === "Pasajero" &&
          //               <Nav.Link as="span">
          //                 <NavLink to="/mapa" style={{ color: 'black' }}>Crea tu ruta</NavLink>
          //               </Nav.Link>
          //               }
          //               {this.props.loggedInUser.role === "Conductor" &&  
          //                 <Nav.Link as="span">
          //                   <NavLink to= "/lista-viajes" style={{ color: 'black' }}>Rutas</NavLink>                          
          //                 </Nav.Link>
          //               }
          //               <Nav.Link as="span">
          //                 <NavLink to="/perfil" style={{ color: 'black' }}>Perfil</NavLink>
          //               </Nav.Link>
          //               <Nav.Link as="span">
          //                 <NavLink to = "/" ><span onClick={this.logout}>Cerrar Sesión</span></NavLink>
          //               </Nav.Link>
          //             </>
          //           ) : (
          //             <>
          //               <Nav.Link as="span">
          //                 <NavLink to="/login" style={{ color: 'black' }}>Inicio de sesión</NavLink>
          //               </Nav.Link>
          //               <Nav.Link as="span">
          //                 <NavLink to="/signup" style={{ color: 'black' }}>Registro</NavLink>
          //               </Nav.Link>
          //             </>
          //           )
          //         }
                  
          //       </Nav>
          //     </Navbar.Collapse>
          //   </Navbar>
          // </>

          // <>
          //   <Navbar collapseOnSelect expand="lg" className = "customNav">
          //     <Navbar.Brand href="#home">Car2Job</Navbar.Brand>
          //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          //     <Navbar.Collapse id="responsive-navbar-nav" >
          //       <Nav className="mr-auto">
          //         <Nav.Link as="span">
          //           <NavLink to="/">Inicio</NavLink>
          //         </Nav.Link>
          //         <Nav.Link href="#pricing">Pricing</Nav.Link>
          //         <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          //           <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          //           <NavDropdown.Divider />
          //           <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          //         </NavDropdown>
          //       </Nav>
          //       <Nav>
          //         <Nav.Link href="#deets">More deets</Nav.Link>
          //         <Nav.Link eventKey={2} href="#memes">
          //           Dank memes
          //         </Nav.Link>
          //       </Nav>
          //     </Navbar.Collapse>
          //   </Navbar>
          // </>


          //ULTIMA VERSION 
//           <>
//             <Navbar collapseOnSelect expand="lg" className = "customNav">
//               <Navbar.Brand href="#home">
//                 <NavLink to="/" className= "brand" style={{ color: 'black' }}>Car2Job</NavLink>
//               </Navbar.Brand>
//               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//               <Navbar.Collapse id="responsive-navbar-nav" >
//                 <Nav className="mr-auto">
//                     <Nav.Link as="span">
//                       <NavLink exact to="/" exact style={{ color: 'black' }}>Inicio</NavLink>
//                     </Nav.Link>
//                     {this.props.loggedInUser ?
//                     (
//                       <>
//                         {this.props.loggedInUser.role === "Pasajero" &&
//                         <Nav.Link as="span">
//                           <NavLink to="/mapa" style={{ color: 'black' }}>Crea tu ruta</NavLink>
//                         </Nav.Link>
//                         }
//                         {this.props.loggedInUser.role === "Conductor" &&  
//                           <Nav.Link as="span">
//                             <NavLink to= "/lista-viajes" style={{ color: 'black' }}>Rutas</NavLink>                          
//                           </Nav.Link>
//                         }
//                         <Nav.Link as="span">
//                           <NavLink to="/perfil" style={{ color: 'black' }}>Perfil</NavLink>
//                         </Nav.Link>
//                         <Nav.Link as="span">
//                           <NavLink to = "/" ><span onClick={this.logout} style={{ color: 'black' }}>Cerrar Sesión</span></NavLink>
//                         </Nav.Link>
//                       </>
//                     )
//                     :(
//                       <>
//                         <Nav.Link as="span">
//                           <NavLink to="/login" style={{ color: 'black' }}>Inicio de sesión</NavLink>
//                         </Nav.Link>
//                         <Nav.Link as="span">
//                           <NavLink to="/signup" style={{ color: 'black' }}>Registro</NavLink>
//                         </Nav.Link>
//                       </>
//                     )}
//                 </Nav>
//               </Navbar.Collapse>
//             </Navbar>
//           </>
//         );
        
//     }
// }

// export default Navigation


          <>
            <Navbar collapseOnSelect expand="lg" className = "customNav" onToggle={this.setNavExpanded} expanded={this.state.navExpanded}>
              <Navbar.Brand href="#home">
                <NavLink to="/" className= "brand" style={{ color: 'black' }}>Car2Job</NavLink>
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