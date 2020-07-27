import React, { Component } from 'react'

import MapService from '../../../../service/MapService'
import AuthService from '../../../../service/AuthService'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import './Traveldetail.css'

class TravelDetails extends Component {
    constructor() {
        super()
        this.state = {
            travelDetails: undefined
        }
        this.mapService = new MapService()
        // this.authService = new AuthService()
    }

    // //MODIFICAR POCKET DE USER

    // modifyPocket = () => {

    //     //TERNARIO AUXILIAR PARA LLAMAR A ESTE MÉTODO ???
    //     // {this.state.travelDetails.status === 'Confirmado'? this.modifyPocket : null}

    //     const resultDriver = this.props.loggedInUser.pocket + this.state.travelDetails.price //SUMA EN POCKET USUARIO CONDUCTOR
    //     // const resultUseer = this.state.travelDetails.owner.pocket - this.state.travelDetails.price //DESCUENTO EN POCKET USUARIO

    //     const id = this.props.loggedInUser._id

    //     this.authService
    //       .editUser(id) //id,user
    //       .then((response) => {
    //         this.props.setTheUser(response.data)
    //         this.props.history.push("/perfil")
    //       })

    // }

    componentDidMount = () => {

        const id = this.props.match.params.id

        this.mapService
            .getOneTravel(id)
            .then(response => this.setState({ travelDetails: response.data }))
            .catch(err => console.log(err))
    }

    deleteCard = e => {

        const id = this.props.match.params.id

        e.preventDefault()
        this.mapService
            .deleteTravel(id)
            .then(() =>  this.props.history.push('/perfil'))
            .catch(err => console.log(err))
    }

    changeStatus = e => {

        const id = this.props.match.params.id

        e.preventDefault()
        this.mapService
            .updateTravel(id, this.state.travelDetails)
            .then(response => {
                console.log("CONSOLE DEL RESPONSE", response)
                this.props.history.push('/perfil')})
                .catch(err => console.log(err))
    }

    render() {

        console.log("PROPS",this.props)
        console.log("STATE",this.state)


        return (

            !this.state.travelDetails ? <h3>CARGANDO</h3> :

                <Container as="main">

                
                    <Row>
                        <Col md={{ span: 5, offset: 1 }}>
                            <h2>DETALLE DE RUTA</h2>
                            <p><b>Origen:</b> {this.state.travelDetails.origin}</p>
                            <p><b>Destino:</b> {this.state.travelDetails.destination}</p>
                            <p><b>Distancia:</b> {this.state.travelDetails.distance}</p>
                            <p><b>Tiempo de ruta:</b> {this.state.travelDetails.travelTime}</p>
                            <p><b>Hora de Llegada:</b> {this.state.travelDetails.arrivalTime}</p>
                            <p><b>Precio:</b> {this.state.travelDetails.price}</p>
                            <p><b>Estado:</b> {this.state.travelDetails.status}</p>
                            

                            
                        </Col>
                        <Col md={{ span: 4, offset: 1 }}>
                            <h2>DETALLE DE USUARIO</h2>
                            <img className="avatarClass"src={this.state.travelDetails.owner.imageUrl} alt={this.state.travelDetails.owner.username}></img>
                            <p><b>Nombre:</b>{this.state.travelDetails.owner.username}</p>
                        </Col>
                        
                    </Row>
                    <hr></hr>
                    <Row>
                    
                        {this.props.loggedInUser._id === this.state.travelDetails.owner._id ?
                            
                            <div>
                                <Link className="btn btn-dark btn-md" to='/perfil'>Volver</Link>
                                <Button onClick={this.deleteCard} variant="dark" type="submit">Borrar</Button>
                            </div>
                        :
                            
                            <div>
                                <Link className="btn btn-dark btn-md" to='/lista-viajes'>Volver</Link>
                                <Button onClick={this.changeStatus} variant="dark" type="submit">Aceptar</Button>
                            </div>
                        }
                    </Row>

                </Container>
        )
    }
}

export default TravelDetails