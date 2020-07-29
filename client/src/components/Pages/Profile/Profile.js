import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import VehicleForm from './VehicleForm/VehicleForm'

import CardDrawer from '../Travel/CardDrawer/CardDrawer'
import MapService from '../../../service/MapService'
import AuthService from '../../../service/AuthService'

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './Profile.css'


class ProfileView extends Component {

    constructor(props) {
        super(props)
        this.state = {
          ownerTravels: [],
          driverTravels:[],
          username: "",
          name: "",
          lastName: "",
          email: "",
          phone: "",
          role: "",
          imageUrl: "",
          vehicle: "",
          pocket: 0,
          showModal: false,
          myTravelsStatus: "",
          driverTravelsStatus: "",
          averageRate: "",
          numberOfRating: ""
        };
        this.mapService = new MapService()
        this.authService = new AuthService()
    }

  componentDidMount = () => {
    
    const id = this.props.loggedInUser._id
    this.updateTravelList()
    
    this.authService
      .getUser(id)
        .then(res => this.updateUserState(res.data))
        .catch(err => console.log(err))
  }

  updateTravelList = () => this.getProfileUserTravels(this.props.loggedInUser._id)

  handleModal = status => this.setState({ showModal: status })

  getProfileUserTravels = id => {

    this.mapService
      .getProfileUserTravels(id)
        .then(response => this.setState({ ownerTravels: response.data }))
        .catch(err => console.log(err))

    this.mapService
      .getProfileDriverTravels(id)
        .then(response => this.setState({ driverTravels: response.data }))
        .catch(err => console.log(err))
  }


  updateUserState = data => {

    this.setState({
      username: data.username || "",
      name: data.name || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      role: data.role,
      imageUrl: data.imageUrl || "",
      vehicle: data.vehicle || "" ,
      pocket: data.pocket || 0,
      averageRate: data.averageRate || "",
      numberOfRating: data.numberOfRating || ""
    })

  }

  changeStatus = (e) => {

    const { name, value } = e.target
    this.setState({ [name]: value } ) 
  }
  
     
  render() {    
    console.log(this.state)
        return (
          <>
            <div className="container ">
              <div className="row justify-content-center profileContainer">
                <div className="col-l-6 col-xs-12">
                  <h1>Hola {this.state.name}</h1>
                  <img className="avatarClass" src={this.state.imageUrl} alt="Imagen de Perfil"></img>  
                </div>
                <div className="col-l-6 col-xs-12">
                  <h2>Datos de Usuario</h2>
                  <hr></hr>
                  <p><strong>Nombre de Usuario:</strong> {this.state.username}</p>
                  <p><strong>Nombre:</strong> {this.state.name}</p>
                  <p><strong>Apellido:</strong> {this.state.lastName}</p>
                  <p><strong>Correo electrónico:</strong> {this.state.email}</p>
                  <p><strong>Teléfono:</strong> {this.state.phone}</p>
                  <p><strong>Tipo de cuenta:</strong> {this.state.role}</p>
                  <p><strong>Cartera:</strong> {(this.state.pocket).toFixed(2)}€</p> 
                  {this.state.vehicle &&                  
                  <Link to={`profile/${this.props.loggedInUser._id}/edit`} className="btn btn-dark btn-sm button">Editar perfil</Link>
                  }
                  {this.state.vehicle ?
                  <div>
                  <h2>Datos de Vehículo</h2>
                  <hr></hr>   
                  <p><strong>Marca:</strong> {this.state.vehicle.brand}</p>
                  <p><strong>Modelo:</strong> {this.state.vehicle.model}</p>
                  <p><strong>Matrícula:</strong> {this.state.vehicle.plate}</p>
                  <p><strong>Combustible:</strong> {this.state.vehicle.fuel}</p>                      
                  <Button  onClick={() => this.handleModal(true)} className = "carButton" variant="dark" size="sm" >Editar vehículo</Button> 
                  </div>
                  :
                  <div className="buttonsContainer">
                  <Link to={`profile/${this.props.loggedInUser._id}/edit`} className="btn btn-dark btn-sm carButton">Editar perfil</Link>
                  <Button  onClick={() => this.handleModal(true)} className = "carButton" variant="dark" size="sm" >Crear vehículo</Button> 
                  </div>
                  } 
                  {this.state.numberOfRating > 0 &&
                  <div>
                    <hr></hr> 
                    <p>Tu Valoración Media es de <strong>{(this.state.averageRate).toFixed(1)}/5</strong> tras {this.state.numberOfRating} {this.state.numberOfRating === 1 ? "voto" : "votos"}</p>
                  </div>
                  }                
                </div>
              
              </div>
            </div>


            <div className="container routesContainer">
              <div className="row justify-content-center profileContainer">
                <div className="col-l-6 col-xs-12">
                  <h2>Rutas de Conductor</h2>
                  <hr></hr> 
                  {this.state.driverTravels.length > 0 ?
                    <div>
                      <div>
                      <Button as="input" onClick={this.changeStatus} variant="warning" size= "sm" active name="driverTravelsStatus" type="submit" value = "En proceso"/>
                      <Button as="input" style={{marginLeft: "5%"}} onClick={this.changeStatus} variant="success" size= "sm" active name="driverTravelsStatus" type="submit" value = "Confirmadas"/>
                      </div>
                      {this.state.driverTravelsStatus === "En proceso" &&
                      <CardDrawer travels = {this.state.driverTravels.filter(elm => elm.status === "En proceso")} loggedInUser={this.props.loggedInUser} {...this.props}/>}
                      {this.state.driverTravelsStatus === "Confirmadas" &&
                      <CardDrawer travels = {this.state.driverTravels.filter(elm => elm.status === "Confirmado")} loggedInUser={this.props.loggedInUser} {...this.props}/>}
                    </div>
                  :
                  <p>No hay rutas que mostrar</p>
                  }
                </div>
                <div className="col-l-6 col-xs-12 ">
                  <h2>Mis Rutas de Pasajero</h2>
                  <hr></hr> 
                  {this.state.ownerTravels.length > 0 ?
                    <div >
                      <div className= "buttonsEnd">
                      <Button as="input"  onClick={this.changeStatus} variant="primary" size= "sm"  name="myTravelsStatus" type="submit" value = "Pendientes"/>
                      <Button as="input" style={{marginLeft: "3%" }} onClick={this.changeStatus} variant="warning" size= "sm"  name="myTravelsStatus" type="submit" value = "En proceso"/>
                      <Button as="input" style={{marginLeft: "3%" }} onClick={this.changeStatus} variant="success" size= "sm"  name="myTravelsStatus" type="submit" value = "Confirmadas"/>
                      </div>
                      {this.state.myTravelsStatus === "Pendientes" &&
                        <CardDrawer travels = {this.state.ownerTravels.filter(elm => elm.status === "Pendiente")} loggedInUser={this.props.loggedInUser} {...this.props}/>}
                      {this.state.myTravelsStatus === "En proceso" &&
                        <CardDrawer travels = {this.state.ownerTravels.filter(elm => elm.status === "En proceso")} loggedInUser={this.props.loggedInUser} {...this.props}/>}
                      {this.state.myTravelsStatus === "Confirmadas" &&
                        <CardDrawer travels = {this.state.ownerTravels.filter(elm => elm.status === "Confirmado")} loggedInUser={this.props.loggedInUser} {...this.props}/>}
                    </div>
                  :
                  <p>No hay rutas que mostrar</p>}
                </div>
              </div>
            </div>
            <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                <Modal.Body>
                  <VehicleForm usuario={this.props} onHide={() => this.handleModal(false)}/>
                </Modal.Body>
            </Modal>
          </>
        );
    }
}

export default ProfileView



