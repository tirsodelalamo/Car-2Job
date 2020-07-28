import React from 'react'

import TravelCard from '../TravelCard/TravelCard'

import Row from 'react-bootstrap/Row'


const CardDrawer = (props) => {


    return (

        

        <div>
            

            {!props.travels ? <h3>CARGANDO</h3> :

            <Row>
                {props.travels.map(elm => <TravelCard key={elm._id} {...elm} />)}
            </Row>}
        </div>
    )
}



export default CardDrawer
