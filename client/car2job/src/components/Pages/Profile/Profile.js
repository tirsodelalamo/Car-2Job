import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'

class ProfileView extends Component {

    constructor(props) {
        super(props)
        this.state = {
          username: '',
          name: '',
          lastname: '',
          email: '',
          phone: '',
          pocket: '',
          role: '',
        };
    }

    setTheUser = user => this.setState( { loggedInUser: user }, () => console.log("El estado del perfil ha cambiado", this.state))
    
    render() {
      
        console.log(this.props)
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h1>Hola {this.props.loggedInUser.name}</h1>
                  <p>Aquí va la imagen</p>
                </div>
                <div className="col-6">
                  <h2>Datos de Usuario</h2>
                  <hr></hr>
                  <p>Nombre de Usuario: {this.props.loggedInUser.username}</p>
                  <p>Nombre: {this.props.loggedInUser.name}</p>
                  <p>Apellido: {this.props.loggedInUser.lastname}</p>
                  <p>Correo electrónico: {this.props.loggedInUser.email}</p>
                  <p>Teléfono: {this.props.loggedInUser.phone}</p>
                  <p>Cartera: {this.props.loggedInUser.pocket}€</p>
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
            </div>
          </>
        );
    }
}

export default ProfileView



