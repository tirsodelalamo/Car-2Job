import React, { Component } from 'react'


import MapService from '../../../service/MapService'
import CardDrawer from './CardDrawer/CardDrawer'

import Container from 'react-bootstrap/Container'



class TravelList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            travels: undefined,

        }
        this.mapService = new MapService()
    }

    componentDidMount = () => this.loadCards()

    loadCards = () => {
        this.mapService
            .getAllTravels()
            .then(response => this.setState({ travels: response.data }))
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <Container as="main" className="coasters-page">

                    <h1>Pasajeros Disponibles</h1>
                    {this.state.travels && 
                    <CardDrawer travels = {this.state.travels.filter(elm => elm.owner._id !== this.props.loggedInUser._id)}/>
                    }
                </Container>
            </>
        )
    }
}

export default TravelList