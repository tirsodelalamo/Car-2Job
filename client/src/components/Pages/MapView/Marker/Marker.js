import React from 'react'
import markerImg from './../../../../public/kisspng-map-drawing-pin-clip-art-map-marker-5b0bc686f2e9c7.724277061527498374995.png'
import './Marker.css'

const Marker = () => {
    return (
      <div className="Marker">
            <img src={markerImg} alt="Marcador" className = "marker"></img>
      </div>
    )
}

export default Marker