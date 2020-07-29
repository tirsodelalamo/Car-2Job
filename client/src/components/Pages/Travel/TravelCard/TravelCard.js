import React from 'react'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import './TravelCard.css'

const TravelCard = ({ _id, origin, destination, arrivalTime, owner}) => {


    return (
        <Col md={4}>
            <Card className="travel-card">
                <div>
                <Card.Img variant="top" style={{width: "50%"}} src={owner.imageUrl} /> 
                </div>
                <Card.Body>
                    <Card.Text><strong>Origen:</strong> {origin}</Card.Text> 
                    <Card.Text><strong>Destino:</strong> {destination}</Card.Text>
                    <Card.Text><strong>{arrivalTime}</strong></Card.Text>
                    <Link to={`/detalleRuta/${_id}`} className="btn btn-dark btn-block btn-sm">Ver detalles de ruta</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TravelCard