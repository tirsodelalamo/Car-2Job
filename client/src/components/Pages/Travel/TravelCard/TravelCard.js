import React from 'react'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import './TravelCard.css'

const TravelCard = ({ _id, origin, destination, arrivalTime, owner}) => {


    return (
        <Col md={4}>
            <Card className="travel-card">
                <Card.Img variant="top" src={owner.imageUrl} /> 
                <Card.Body>
                    <Card.Text>Origen: {origin}</Card.Text> 
                    <Card.Text>Destino: {destination}</Card.Text>
                    <Card.Text>{arrivalTime}</Card.Text>
                    <Link to={`/detalleRuta/${_id}`} className="btn btn-dark btn-block btn-sm">Ver detalles de ruta</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TravelCard