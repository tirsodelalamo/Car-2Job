import React from 'react'
import SimpleMap from './Map/Map'
import LocationSearchInput from './Autocomplete/InputSelectAuto'
// import Autocomplete from './Autocomplete/Autocomplete'

const MapView = () => {

    return (
      <>
        {/* <Autocomplete />
        <Autocomplete /> */}

        <LocationSearchInput />
        {/* <LocationSearchInput /> */}
        <SimpleMap />
      </>
    );
}

export default MapView

