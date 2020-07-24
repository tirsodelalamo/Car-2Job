import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";


class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { origin: {}, destination: {} };
  }

  handleChange = (origin) => {
    this.setState({ origin });
  };

  handleChangeDestination = (destination) => {
    this.setState({ destination });
  };

  handleSelect = (origin) => {
    geocodeByAddress(origin)
      .then((results) => (getLatLng(results[0]))) //OBTENCIÓN DE LAT Y LNG DE DIRECCIÓN INTRODUCIDA
      .then((latLng) => this.setState({origin: latLng}))
      .then(() => this.props.setCoordsOrigin(this.state.origin))
      .catch((error) => console.error("Error", error))
  };


  handleSelectDestination = (destination) => {
    geocodeByAddress(destination)
      .then((results) => (getLatLng(results[0]))) //OBTENCIÓN DE LAT Y LNG DE DIRECCIÓN INTRODUCIDA
      .then((latLng) => this.setState({destination: latLng}))
      .then(() => this.props.setCoordsDestination(this.state.destination))
      .catch((error) => console.error("Error", error))
  };

  render() {
    console.log(this.state)
    return (
      <>
        <PlacesAutocomplete
          value={this.state.origin}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
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
      </>
    );
  }
}

export default LocationSearchInput;