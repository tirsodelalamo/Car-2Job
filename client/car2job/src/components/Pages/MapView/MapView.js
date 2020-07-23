import React from 'react'
import SimpleMap from './Map/Map'
import LocationSearchInput from './Autocomplete/InputSelectAuto'


const MapView = () => {

    return (
      <>
        <h1>Elige tu ruta!</h1>
        <LocationSearchInput />
        <p>Las coordenadas son </p>
        <SimpleMap />
      </>
    );
}

export default MapView

