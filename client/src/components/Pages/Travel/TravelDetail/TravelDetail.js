import React, { Component } from 'react'

import MapService from '../../../../service/MapService'
import AuthService from '../../../../service/AuthService'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

import './Traveldetail.css'


class TravelDetails extends Component {
    constructor() {
        super()
        this.state = {
            travelDetails: undefined,
            statusDetail: "",
            driver: {},
            rating: undefined,
            noMoney: undefined

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


        if (this.state.travelDetails.owner.pocket < this.state.travelDetails.price) {

           this.setState({noMoney: "No tienes fondos suficientes"})
         
        } else {
            
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

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => this.rateDriver())
    }

    rateDriver = () => {

        const driverId = this.state.travelDetails.driver._id
        const travelId = this.props.match.params.id

        this.setState(prevState => ({
            travelDetails: {
                ...prevState.travelDetails,
                driver:{
                    ...prevState.travelDetails.driver,
                    rating: parseInt(this.state.rating) + parseInt(this.state.travelDetails.driver.rating),
                    numberOfRating: this.state.travelDetails.driver.numberOfRating++
                }
            }
            }), () => this.updateRating( driverId, travelId))
    }

    updateRating = (driverId, travelId) => {

        this.authService
        .rateDriver(travelId, driverId, this.state)
        .then(() => this.props.history.push("/perfil"))
        .catch((err) => console.log(err));
        
    }

    render() {

        this.state.statusDetail && this.checkStatus()
        return (

            !this.state.travelDetails ? <h3>CARGANDO</h3> :

                <Container as="main">

                
                    <Row>
                        <Col md={{ span: 5, offset: 1 }} className = "colContainer">
                            <h2>Detalle Ruta</h2>
                            <hr></hr>
                            <p><b>Origen:</b> {this.state.travelDetails.origin}</p>
                            <p><b>Destino:</b> {this.state.travelDetails.destination}</p>
                            <p><b>Distancia:</b> {this.state.travelDetails.distance}</p>
                            <p><b>Tiempo de ruta:</b> {this.state.travelDetails.travelTime}</p>
                            <p><b>Hora de Llegada:</b> {this.state.travelDetails.arrivalTime}</p>
                            <p><b>Precio:</b> {this.state.travelDetails.price}</p>
                            <p><b>Estado:</b> {this.state.travelDetails.status}</p>


                            {this.props.loggedInUser._id === this.state.travelDetails.owner._id ?
                            
                            <div>
                                {this.state.travelDetails.status.includes("En proceso") && 
                                <div className = "acceptDriver">
                                    <div className = "buttons">
                                        <h3>¿Quieres aceptar a {this.state.travelDetails.driver.name} como conductor?</h3>
                                        <Button as="input" onClick={this.changeStatus} variant="success" name="statusDetail" type="submit" value = "Confirmar"/>
                                        <Button as="input" style = {{marginLeft: "5%"}} onClick={this.changeStatus} variant="danger" name="statusDetail" type="submit" value = "Rechazar"/>
                                        <p>{this.state.noMoney}</p>
                                    </div>
                                    <br></br>
                                    <div className = "driverRate">
                                        {this.state.travelDetails.driver.numberOfRating >= 1 ?                   
                                        <p>{this.state.travelDetails.driver.name} tiene una calificación media de <strong>{(this.state.travelDetails.driver.averageRate).toFixed(1)}/5</strong> tras {this.state.travelDetails.driver.numberOfRating} {this.state.travelDetails.driver.numberOfRating > 1 ? "votos" : "voto"}</p>
                                        :
                                        <p>{this.state.travelDetails.driver.name} aún no ha recibido ninguna valoración</p>  
                                        }  
                                    </div>
                                </div>
                                }
                            </div>
                          
                        :
                            
                            <div>
                                
                                {this.state.travelDetails.status === "Pendiente" &&
                                <div className = "acceptUser">
                                    <h2 className= "buttonsAsk">¿Quieres llevar a {this.state.travelDetails.owner.name}?</h2>  
                                    <Button as="input"  onClick={this.changeStatus} variant="success" name="statusDetail" type="submit" value='Aceptar'/> 
                                </div>

                                }
                                
                            </div>
                        }
       
                        </Col>
                        <Col md={{ span: 4, offset: 1 }}>
                            <img className="avatarClass" src={this.state.travelDetails.owner.imageUrl} alt={this.state.travelDetails.owner.username}></img>
                            <h2>Información del Pasajero</h2>
                            <hr></hr>
                            <p><b>Nombre:</b> {this.state.travelDetails.owner.name}</p>  
                            <p><b>Móvil:</b> {this.state.travelDetails.owner.phone}</p> 
                            <p><b>Correo electrónico:</b> {this.state.travelDetails.owner.email}</p> 
                            {this.state.travelDetails.driver &&
                            <div className="driverContainer">
                                <img className="avatarClass" src={this.state.travelDetails.driver.imageUrl} alt={this.state.travelDetails.driver.username}></img>
                                <h2>Información de Conductor</h2>
                                <hr></hr>
                                <p><b>Nombre:</b> {this.state.travelDetails.driver.name}</p>
                                <p><b>Móvil:</b> {this.state.travelDetails.driver.phone}</p>
                                <p><b>Correo Electrónico:</b> {this.state.travelDetails.driver.email}</p>
                                <p><b>Marca Vehículo:</b> {this.state.travelDetails.driver.vehicle.brand}</p>
                                <p><b>Modelo Vehículo:</b> {this.state.travelDetails.driver.vehicle.model}</p>
                                <p><b>Combustible Vehículo:</b> {this.state.travelDetails.driver.vehicle.fuel}</p>
                                <p><b>Matrícula Vehículo:</b> {this.state.travelDetails.driver.vehicle.plate}</p>
                                <br></br>
                                
                            </div>
                            }
                            {this.props.loggedInUser._id === this.state.travelDetails.owner._id ?
                            <div>
                                {this.state.travelDetails.status.includes("Confirmado") ?
                                <div className = "buttons">     
                                    {this.state.travelDetails.rated === "No" &&
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>
                                            <strong>Valora al conductor</strong>
                                        </Form.Label>
                                        <Form.Control as="select" onChange={this.handleInputChange} value={this.state.rating} name="rating" type="number">
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                        </Form.Group>
                                    </Form>
                                    }
                                    <Link className="btn btn-dark btn-md" to='/perfil'>Volver</Link>
                                </div>
                                :
                                <div>
                                    <Link className="btn btn-dark btn-md" to='/perfil'>Volver</Link>
                                    <Button onClick={this.deleteCard} style = {{marginLeft: "5%"}} variant="dark" type="submit">Borrar Ruta</Button> 
                                </div>
                                }
                            </div>
                            :
                            <div>
                                {this.state.travelDetails.status !== "Pendiente" ?
                                
                                <Link className="btn btn-dark btn-md" to='/perfil'>Volver</Link>
                                :
                                <Link className="btn btn-dark btn-md" to='/lista-viajes'>Volver</Link>
                                }
                            </div>
                            }
                        </Col>                      
                    </Row>
                    
                </Container>
        )
    }
}

export default TravelDetails