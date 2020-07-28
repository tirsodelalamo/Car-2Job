import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'




class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      origin: "", 
      destination: "",
      originCoordenates: "",
      destinationCoordenates: ""
    };
  }

  handleChangeOrigin = (origin) => {
    this.setState({ origin});
  };

  handleChangeDestination = (destination) => {
    this.setState({ destination });
  };

  handleSelectOrigin = (origin) => {
    this.setState({origin: origin}, this.coordenatesOriginGenerator(origin))

  };

  coordenatesOriginGenerator = (arg) => {
    geocodeByAddress(arg)
      .then((results) => (getLatLng(results[0])))
      .then((latLng) => this.setState({originCoordenates: latLng}))
      .then(() => this.props.setCoordsOrigin(this.state.originCoordenates))
      .catch((error) => console.error("Error", error))
  }

  handleSelectDestination = (destination) => {
    this.setState({destination: destination}, this.coordenatesDestinationGenerator(destination))

  };

  coordenatesDestinationGenerator = (arg) => {
    geocodeByAddress(arg)
      .then((results) => (getLatLng(results[0])))
      .then((latLng) => this.setState({destinationCoordenates: latLng}))
      .then(() => this.props.setCoordsDestination(this.state.destinationCoordenates))
      .catch((error) => console.error("Error", error))
  }

  render() {
      console.log("ESTE ES EL ESTADO DEL AUTOCOMPLETE",this.state)
      
    return (
      <>
        <Container>
          <Row>
            <Col>
              <h3>Origen:</h3>
              <PlacesAutocomplete
                value={this.state.origin}
                onSelect={this.handleSelectOrigin}
                onChange={this.handleChangeOrigin}
                googleCallbackName="initOne"
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Indique origen",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Col>

            <Col>      
              <h3>Destino:</h3>
              <PlacesAutocomplete
                value={this.state.destination}
                onSelect={this.handleSelectDestination}
                onChange={this.handleChangeDestination}
                googleCallbackName="initTwo"
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Indique destino",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Col>  
          </Row>
        </Container>
      </>
    );
  }
}

export default LocationSearchInput;