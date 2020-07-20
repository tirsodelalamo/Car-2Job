import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

const ProfileView = props => {

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h1>Hola {props.loggedInUser.username}</h1>
              <p>Aquí va la imagen</p>
            </div>
            <div className="col-6">
              <h2>Datos de Usuario</h2>
              <hr></hr>
              <p>Nombre de Usuario: {props.loggedInUser.username}</p>
              <p>Nombre: {props.loggedInUser.name}</p>
              <p>Apellido: {props.loggedInUser.lastname}</p>
              <p>Correo electrónico: {props.loggedInUser.email}</p>
              <p>Teléfono: {props.loggedInUser.phone}</p>
              <p>Cartera: {props.loggedInUser.pocket}€</p>
              
            </div>
          </div>
        </div>

        <div className="container">
          <h3>Tus rutas:</h3>
        </div>
      </>
    );
}

export default ProfileView