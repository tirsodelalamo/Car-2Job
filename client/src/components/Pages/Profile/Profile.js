import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import './Profile.css'

import CardDrawer from '../Travel/CardDrawer/CardDrawer'
import MapService from '../../../service/MapService'


class ProfileView extends Component {

    constructor(props) {
        super(props)
        this.state = {
          username: '',
          name: '',
          lastname: '',
          email: '',
          phone: '',
          role: '',
          imageUrl: '',
          travels: ""
        };
        this.mapService = new MapService()
    }

  componentDidMount = () => this.updateTravelList()

  updateTravelList = () => this.getProfileUserTravels(this.props.loggedInUser._id)

  getProfileUserTravels = id => {
    this.mapService.
        getAllTravelsFromUser(id)
        .then(response => this.setState({ travels: response.data }))
        .catch(err => console.log(err))
  }
  
     
    render() {
      
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h1>Hola {this.props.loggedInUser.name}</h1>
                  <img className="avatarClass" src={this.props.loggedInUser.imageUrl} alt= "Imagen de Perfil"></img>
                </div>
                <div className="col-6">
                  <h2>Datos de Usuario</h2>
                  <hr></hr>
                  <p><strong>Nombre de Usuario:</strong> {this.props.loggedInUser.username}</p>
                  <p><strong>Nombre:</strong> {this.props.loggedInUser.name}</p>
                  <p><strong>Apellido:</strong> {this.props.loggedInUser.lastName}</p>
                  <p><strong>Correo electrónico:</strong> {this.props.loggedInUser.email}</p>
                  <p><strong>Teléfono:</strong> {this.props.loggedInUser.phone}</p>
                  <p><strong>Tipo de cuenta:</strong> {this.props.loggedInUser.role}</p>
                  <p><strong>Cartera:</strong> {this.props.loggedInUser.pocket}€</p>
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
              <h3>Tus rutas:</h3>
              <CardDrawer travels = {this.state.travels} loggedInUser={this.props.loggedInUser} {...this.props}/>
            </div>
          </>
        );
    }
}

export default ProfileView



