import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import './Profile.css'

import CardDrawer from '../Travel/CardDrawer/CardDrawer'
import MapService from '../../../service/MapService'
import AuthService from '../../../service/AuthService'


class ProfileView extends Component {

    constructor(props) {
        super(props)
        this.state = {
          travels: [],
          username: "",
          name: "",
          lastName: "",
          email: "",
          phone: "",
          role: "",
          imageUrl: "",
          vehicle: "",
          pocket: 0
        };
        this.mapService = new MapService()
        this.authService = new AuthService()
    }

  componentDidMount = () => {
    
    const id = this.props.loggedInUser._id
    this.updateTravelList()
    
    this.authService.
      getUser(id)
        .then(res => this.updateUserState(res.data))
        .catch(err => console.log(err))
  }

  updateTravelList = () => this.getProfileUserTravels(this.props.loggedInUser._id)

  getProfileUserTravels = id => {
    this.mapService.
      getAllTravelsFromUser(id)
        .then(response => this.setState({ travels: response.data }))
        .catch(err => console.log(err))
  }

  // getProfileData = id => {
  //   this.authService.
  //     getUser(id)
  //       .then(res => this.updateUserState(res.data))
  //       .catch(err => console.log(err))
  // }

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
      pocket: data.pocket || 0
    })

  }
  
     
    render() {

      console.log("ESTADO", this.state)
      console.log("PROPS", this.props)

      
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h1>Hola {this.state.name}</h1>
                  <img className="avatarClass" src={this.state.imageUrl} alt= "Imagen de Perfil"></img>
                </div>
                <div className="col-6">
                  <h2>Datos de Usuario</h2>
                  <hr></hr>
                  <p><strong>Nombre de Usuario:</strong> {this.state.username}</p>
                  <p><strong>Nombre:</strong> {this.state.name}</p>
                  <p><strong>Apellido:</strong> {this.state.lastName}</p>
                  <p><strong>Correo electrónico:</strong> {this.state.email}</p>
                  <p><strong>Teléfono:</strong> {this.state.phone}</p>
                  <p><strong>Tipo de cuenta:</strong> {this.state.role}</p>
                  <p><strong>Cartera:</strong> {(this.state.pocket).toFixed(2)}€</p> 
                  <Link
                    to={`profile/${this.props.loggedInUser._id}/edit`}
                    className="btn btn-dark btn-sm"
                  >
                    Edita tu perfil
                  </Link>
                </div>
              </div>
            </div>

            <div className="container">
              
              {this.state.travels.length > 0 && 
                <div>
                <h3>Rutas pendientes de ser aceptadas:</h3>
                <CardDrawer travels = {this.state.travels.filter(elm => elm.status === "Pendiente")} loggedInUser={this.props.loggedInUser} {...this.props}/>
                <h3>Rutas aceptadas por conductor:</h3>
                <CardDrawer travels = {this.state.travels.filter(elm => elm.status === "En proceso")} loggedInUser={this.props.loggedInUser} {...this.props}/>
                <h3>Rutas confirmadas por ti y por el conductor:</h3>
                <CardDrawer travels = {this.state.travels.filter(elm => elm.status === "Confirmado")} loggedInUser={this.props.loggedInUser} {...this.props}/>
                </div>
              }
            </div>
          </>
        );
    }
}

export default ProfileView



