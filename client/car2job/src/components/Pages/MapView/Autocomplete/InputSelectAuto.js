

// import React from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//       this.state = { origin: "", destination: "" };
//   }

//   handleChange = (origin) => {
//     this.setState({ origin });
//   };

//   handleChange2 = (destination) => {
//     this.setState({ destination });
//   };
    
    

//   handleSelect = (origin, destination) => {
//     geocodeByAddress(origin, destination)
//         .then((results) => getLatLng(results[0])) //OBTENCIÓN DE LAT Y LNG DE DIRECCIÓN INTRODUCIDA
        
//       .then((latLng) => console.log("Success", latLng))
//       .catch((error) => console.error("Error", error));
//   };

//   render() {

//     return (
//       <>
//         <PlacesAutocomplete
//           value={this.state.origin}
//           onSelect={this.handleSelect}
//           onChange={this.handleChange}
//           googleCallbackName="initOne"
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: "Indique origen",
//                   className: "location-search-input",
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? "suggestion-item--active"
//                     : "suggestion-item";
//                   // inline style for demonstration purpose
//                   const style = suggestion.active
//                     ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                     : { backgroundColor: "#ffffff", cursor: "pointer" };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>

//         <PlacesAutocomplete
//           value={this.state.destination}
//           onSelect={this.handleSelect}
//           onChange={this.handleChange2}
//           googleCallbackName="initTwo"
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: "Indique destino",
//                   className: "location-search-input",
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? "suggestion-item--active"
//                     : "suggestion-item";
//                   // inline style for demonstration purpose
//                   const style = suggestion.active
//                     ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                     : { backgroundColor: "#ffffff", cursor: "pointer" };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//       </>
//     );
//   }
// }

// export default LocationSearchInput;

import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";


class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { origin: "", destination: "" };
  }

  handleChange = (origin) => {
    this.setState({ origin });
  };

  handleChange2 = (destination) => {
    this.setState({ destination });
  };

  handleSelect = (origin) => {
    geocodeByAddress(origin)
      .then((results) => getLatLng(results[0])) //OBTENCIÓN DE LAT Y LNG DE DIRECCIÓN INTRODUCIDA
      .then((latLng) => this.state.origin = latLng)
      //   .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  handleSelect2 = (destination) => {
    geocodeByAddress(destination)
      .then((results) => getLatLng(results[0])) //OBTENCIÓN DE LAT Y LNG DE DIRECCIÓN INTRODUCIDA
      .then((latLng) => this.state.destination = latLng)
      //   .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
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
          onSelect={this.handleSelect2}
          onChange={this.handleChange2}
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