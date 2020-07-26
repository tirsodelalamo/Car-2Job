import React, {Component} from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import AuthService from './../service/AuthService'

import Navigation from './Navbar/NavBar'
import MapView from './Pages/MapView/MapView'
import TravelList from './Pages/Travel/index'
import ProfileView from './Pages/Profile/Profile'
import Home from './Pages/Home/Home'
import Login from './Auth/LogIn/Login'
import UserForm from './Auth/UserForm/UserForm'

import { Switch, Route, Redirect } from "react-router-dom"
import TravelDetail from './Pages/Travel/TravelDetail/TravelDetail'


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
          <Route path="/mapa" render={props => this.state.loggedInUser ? <MapView loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} {...props}/> :  <Redirect to="/login" />}/>
          <Route path="/lista-viajes" render={() => <TravelList loggedInUser={this.state.loggedInUser}/>} />
          <Route path="/detalleRuta/:id" render={props => <TravelDetail loggedInUser={this.state.loggedInUser} {...props}/>} />
          <Route
            path="/perfil"
            render= { props =>
              this.state.loggedInUser ? <ProfileView loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} {...props} />  :
                <Redirect to="/login" />}
          />
          <Route path='/profile/:id/edit' render = {props => this.state.loggedInUser ? <UserForm loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} {...props}/> : <Redirect to = '/login' />} ></Route>
        </Switch>
      </>
    )
  }
}




export default App
