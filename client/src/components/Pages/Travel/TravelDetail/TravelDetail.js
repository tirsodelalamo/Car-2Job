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
            travelDetails: undefined,
            statusDetail: "",
            driver: {}

        }
        this.mapService = new MapService()
        this.authService = new AuthService()
    }

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

    modifyPocket = () => {

        const ownerId = this.state.travelDetails.owner._id
        const driverId = this.state.travelDetails.driver._id
        const travelId = this.props.match.params.id

        console.log("ENTRA EN EL MODIFYPOCKET")


        if (this.state.travelDetails.owner.pocket < this.state.travelDetails.price) {

            console.log("No tienes dinero")
         
        } else {

            console.log("SE COBRA AQUIIIIIIIIIIIIIIIIIIIIII")
            
            this.setState(prevState => ({
            travelDetails: {
                ...prevState.travelDetails,
                owner:{
                    ...prevState.travelDetails.owner,
                    pocket: this.state.travelDetails.owner.pocket - this.state.travelDetails.price
                },
                driver: {
                    ...prevState.travelDetails.driver,
                    pocket: this.state.travelDetails.driver.pocket + this.state.travelDetails.price
                }
            },
            statusDetail: "Confirmar"
            }), () => this.updateAll(ownerId , driverId, travelId))
        }
    }

    updateAll = (ownerId, driverId, travelId) => {

        this.authService
            .transferMoney(ownerId, this.state)
            .catch(err => console.log("OWNER",err))

        this.authService
            .transferMoney(driverId, this.state)
            .catch(err => console.log("DRIVER",err))

        this.mapService
            .updateTravel(travelId, this.state)
            .then(() => this.props.history.push('/perfil'))
            .catch(err => console.log("TRAVEL",err))

        
    }

    modifyTravel = () => {

        const travelId = this.props.match.params.id

        console.log("ENTRA EN EL MODIFYTRAVEL")

        this.mapService
        .updateTravel(travelId, this.state)
        .then(() => this.props.history.push('/perfil'))
        .catch(err => console.log("TRAVEL",err))
        
    }

    changeStatus = (e) => {
        
        this.setState({driver: this.props.loggedInUser})
        const { name, value } = e.target
        this.setState({ [name]: value } )  

    }

    checkStatus = () => {

        const status = this.state.statusDetail

        switch(status) {

        
            case "Confirmar":
                this.modifyPocket()
                this.setState({statusDetail: ""})
                break;
            
            case "Aceptar":
                this.modifyTravel()
                this.setState({statusDetail: ""})

                break;
            
            case "Rechazar":
                this.modifyTravel()
                this.setState({statusDetail: ""})
                break
        }

    }

    render() {

        console.log("STATE", this.state)
        this.state.statusDetail && this.checkStatus()
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
                            <img className="avatarClass" src={this.state.travelDetails.owner.imageUrl} alt={this.state.travelDetails.owner.username}></img>
                            <p><b>Nombre:</b>{this.state.travelDetails.owner.name}</p>
                            <hr></hr>

                            
                        </Col>
                        
                    </Row>
                    <hr></hr>
                    <Row>
                    
                        {this.props.loggedInUser._id === this.state.travelDetails.owner._id ?
                            
                            <div>
                                <Link className="btn btn-outline-dark btn-md" to='/perfil'>Volver</Link>
                                {!this.state.travelDetails.status.includes("Confirmado") &&
                                <Button onClick={this.deleteCard} variant="outline-dark" type="submit">Borrar</Button> 
                                }
                                {this.state.travelDetails.status.includes("En proceso") &&
                                <div>
                                    <Button as="input" onClick={this.changeStatus} variant="outline-success" name="statusDetail" type="submit" value = "Confirmar"/>
                                    <Button as="input" onClick={this.changeStatus} variant="outline-danger" name="statusDetail" type="submit" value = "Rechazar"/>
                                </div>}
                            </div>
                        :
                            
                            <div>
                                <Link className="btn btn-outline-dark btn-md" to='/lista-viajes'>Volver</Link>
                                <Button as="input" onClick={this.changeStatus} variant="outline-success" name="statusDetail" type="submit" value='Aceptar'/> 
                            </div>
                        }
                    </Row>

                </Container>
        )
    }
}

export default TravelDetails