import React, {Component} from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import AuthService from './../service/AuthService'

import Navigation from './Navbar/NavBar'
import MapView from './Pages/MapView/MapView'
import DriverView from './Pages/DriverView/DriverView'
import ProfileView from './Pages/Profile/Profile'
import Home from './Pages/Home/Home'
import Login from './Auth/LogIn/Login'
import UserForm from './Auth/UserForm/UserForm'

import { Switch, Route, Redirect } from "react-router-dom"


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null,
    }
    this.AuthService = new AuthService();
  }

  setTheUser = (user) =>
    this.setState({ loggedInUser: user }, () =>
      console.log("Cambio en el estado:", this.state)
    )
  
  fetchUser = () => {
    this.AuthService.isLoggedIn()
      .then(
        (response) =>
          this.state.loggedInUser === null &&
          this.setState({ loggedInUser: response.data })
      )
      .catch((err) => console.log({ err }))
  }

  render() {

    this.fetchUser()

    return (
      <>
        <Navigation
          setTheUser={this.setTheUser}
          loggedInUser={this.state.loggedInUser}
        />

        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} setTheUser={this.setTheUser} />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <UserForm {...props} setTheUser={this.setTheUser} />
            )}
          />
          <Route path="/mapa" render={() => <MapView />} />
          <Route path="/conductor" render={() => <DriverView />} />
          <Route
            path="/perfil"
            render={() =>
              this.state.loggedInUser ? <ProfileView loggedInUser={this.state.loggedInUser} /> :
                <Redirect to="/login" />}
          />
          <Route path='/perfil/:id/editar' render = {props => this.state.loggedInUser ? <UserForm loggedInUser={this.state.loggedInUser} {...props}/> : <Redirect to = '/login' />} />
        </Switch>
      </>
    );
  }
}




export default App
