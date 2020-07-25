(this.webpackJsonpcar2job=this.webpackJsonpcar2job||[]).push([[0],{110:function(e,t,a){},115:function(e,t,a){},116:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(21),o=a.n(l),s=(a(67),a(7)),i=a(9),c=a(11),u=a(10),m=(a(68),a(41),a(25)),p=a.n(m),h=function e(){var t=this;Object(s.a)(this,e),this.login=function(e){return t.service.post("/login",e)},this.editUser=function(e,a){return t.service.put("/profile/".concat(e,"/edit"),a)},this.getUser=function(e){return t.service.get("/profile/".concat(e,"/edit"))},this.signUp=function(e){return t.service.post("/signup",e)},this.logout=function(){return t.service.post("/logout")},this.isLoggedIn=function(){return t.service.get("/loggedin")},this.service=p.a.create({baseURL:"https://car-two-go.herokuapp.com/api",withCredentials:!0})},d=a(39),g=a(18),E=a(14),f=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).logout=function(){n.AuthService.logout().then((function(){n.props.setTheUser(!1)})).catch((function(e){return console.log(e)}))},n.AuthService=new h,n}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{bg:"dark",variant:"dark",sticky:"top"},r.a.createElement(d.a.Brand,null,r.a.createElement(E.c,{to:"/",activeStyle:{color:"white"}},"Car2Job")),r.a.createElement(g.a,{className:"ml-auto"},r.a.createElement(g.a.Link,{as:"span"},r.a.createElement(E.c,{to:"/",exact:!0,activeStyle:{color:"white"}},"Inicio")),this.props.loggedInUser?r.a.createElement(r.a.Fragment,null,"Pasajero"===this.props.loggedInUser.role?r.a.createElement(g.a.Link,{as:"span"},r.a.createElement(E.c,{to:"/mapa",activeStyle:{color:"white"}},"Vista usuario")):null,"Conductor"===this.props.loggedInUser.role?r.a.createElement(g.a.Link,{as:"span"},r.a.createElement(E.c,{to:"/conductor",activeStyle:{color:"white"}},"Vista conductor")):null,r.a.createElement(g.a.Link,{as:"span"},r.a.createElement(E.c,{to:"/perfil",activeStyle:{color:"white"}},"Perfil")),r.a.createElement(g.a.Link,{as:"span"},r.a.createElement("span",{onClick:this.logout},"Cerrar Sesi\xf3n"))):r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a.Link,{as:"span"},r.a.createElement(E.c,{to:"/login",activeStyle:{color:"white"}},"Inicio de sesi\xf3n")),r.a.createElement(g.a.Link,{as:"span"},r.a.createElement(E.c,{to:"/signup",activeStyle:{color:"white"}},"Registro"))))))}}]),a}(n.Component),v=a(60),b=a.n(v),C=a(61),U=a.n(C),I=(a(110),function(){return r.a.createElement("div",{className:"Marker"},r.a.createElement("img",{src:U.a,alt:"Marcador",className:"marker"}))}),S=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(e){return console.log(this.props.data.origin),console.log(this.props.data.destination),r.a.createElement("div",{style:{height:"50vh",width:"100%"}},r.a.createElement(b.a,{bootstrapURLKeys:{key:"AIzaSyBf8Nlxiwn7uJlN9-H0TWIqQMxIm527UHc"},defaultCenter:this.props.center,defaultZoom:this.props.zoom},r.a.createElement(I,{lat:40.3925046,lng:-3.700465,text:"My Marker"}),r.a.createElement(I,{lat:40.3945398,lng:-3.6984026,text:"My Marker"})))}}]),a}(n.Component);S.defaultProps={center:{lat:40.3925046,lng:-3.700465},zoom:14};var O=S,j=a(22),y=a.n(j),k=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.setState({origin:e})},n.handleChangeDestination=function(e){n.setState({destination:e})},n.handleSelect=function(e){Object(j.geocodeByAddress)(e).then((function(e){return Object(j.getLatLng)(e[0])})).then((function(e){return n.setState({origin:e})})).then((function(){return n.props.setCoordsOrigin(n.state.origin)})).catch((function(e){return console.error("Error",e)}))},n.handleSelectDestination=function(e){Object(j.geocodeByAddress)(e).then((function(e){return Object(j.getLatLng)(e[0])})).then((function(e){return n.setState({destination:e})})).then((function(){return n.props.setCoordsDestination(n.state.destination)})).catch((function(e){return console.error("Error",e)}))},n.state={origin:{},destination:{}},n}return Object(i.a)(a,[{key:"render",value:function(){return console.log(this.state),r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{value:this.state.origin,onSelect:this.handleSelect,onChange:this.handleChange,googleCallbackName:"initOne"},(function(e){var t=e.getInputProps,a=e.suggestions,n=e.getSuggestionItemProps,l=e.loading;return r.a.createElement("div",null,r.a.createElement("input",t({placeholder:"Indique origen",className:"location-search-input"})),r.a.createElement("div",{className:"autocomplete-dropdown-container"},l&&r.a.createElement("div",null,"Loading..."),a.map((function(e){var t=e.active?"suggestion-item--active":"suggestion-item",a=e.active?{backgroundColor:"#fafafa",cursor:"pointer"}:{backgroundColor:"#ffffff",cursor:"pointer"};return r.a.createElement("div",n(e,{className:t,style:a}),r.a.createElement("span",null,e.description))}))))})),r.a.createElement(y.a,{value:this.state.destination,onSelect:this.handleSelectDestination,onChange:this.handleChangeDestination,googleCallbackName:"initTwo"},(function(e){var t=e.getInputProps,a=e.suggestions,n=e.getSuggestionItemProps,l=e.loading;return r.a.createElement("div",null,r.a.createElement("input",t({placeholder:"Indique destino",className:"location-search-input"})),r.a.createElement("div",{className:"autocomplete-dropdown-container"},l&&r.a.createElement("div",null,"Loading..."),a.map((function(e){var t=e.active?"suggestion-item--active":"suggestion-item",a=e.active?{backgroundColor:"#fafafa",cursor:"pointer"}:{backgroundColor:"#ffffff",cursor:"pointer"};return r.a.createElement("div",n(e,{className:t,style:a}),r.a.createElement("span",null,e.description))}))))})))}}]),a}(r.a.Component),w=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).setCoordsOrigin=function(t){return e.setState({origin:t})},e.setCoordsDestination=function(t){return e.setState({destination:t})},e.state={origin:{},destination:{}},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Elige tu ruta!"),r.a.createElement(k,{setCoordsOrigin:this.setCoordsOrigin,setCoordsDestination:this.setCoordsDestination}),r.a.createElement("p",null,"Las coordenadas son: Latitude: ",this.state.destination.lat," Longitude: ",this.state.destination.lng),console.log("MIRA ESTO",this.state),r.a.createElement(O,{data:this.state}))}}]),a}(n.Component),L=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Esta es la vista del conductor"),r.a.createElement("p",null,"Deben aparecer tarjetas con las rutas a elegir"))},N=(a(115),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={username:"",name:"",lastname:"",email:"",phone:"",role:"",imageUrl:""},n}return Object(i.a)(a,[{key:"render",value:function(){return console.log(this.props),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-6"},r.a.createElement("h1",null,"Hola ",this.props.loggedInUser.name),r.a.createElement("img",{className:"avatarClass",src:this.props.loggedInUser.imageUrl,alt:"Imagen de Perfil"})),r.a.createElement("div",{className:"col-6"},r.a.createElement("h2",null,"Datos de Usuario"),r.a.createElement("hr",null),r.a.createElement("p",null,"Nombre de Usuario: ",this.props.loggedInUser.username),r.a.createElement("p",null,"Nombre: ",this.props.loggedInUser.name),r.a.createElement("p",null,"Apellido: ",this.props.loggedInUser.lastName),r.a.createElement("p",null,"Correo electr\xf3nico: ",this.props.loggedInUser.email),r.a.createElement("p",null,"Tel\xe9fono: ",this.props.loggedInUser.phone),r.a.createElement("p",null,"Tipo de cuenta: ",this.props.loggedInUser.role),r.a.createElement("p",null,"Cartera: ",this.props.loggedInUser.pocket,"\u20ac"),r.a.createElement(E.b,{to:"profile/".concat(this.props.loggedInUser._id,"/edit"),className:"btn btn-dark btn-sm"},"Edita tu perfil")))),r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"Tus rutas:")))}}]),a}(n.Component)),T=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Esta es la Home"),r.a.createElement("p",null,"Imagen de fondo, y algo de informaci\xf3n"))},F=a(27),x=a(30),D=a(5),M=a(28),A=a(29),G=a(23),P=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleInputChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(F.a)({},a,r))},n.handleFormSubmit=function(e){e.preventDefault(),n.authService.login(n.state).then((function(e){n.props.setTheUser(e.data),n.props.history.push("/")})).catch((function(e){return console.log(e.response.data.message)}))},n.state={username:"",password:""},n.authService=new h,n}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(M.a,{as:"main"},r.a.createElement(A.a,null,r.a.createElement(G.a,{md:{offset:3,span:6}},r.a.createElement("h3",null,"Inicio de sesi\xf3n"),r.a.createElement("hr",null),r.a.createElement(D.a,{onSubmit:this.handleFormSubmit},r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Nombre de usuario"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.username,name:"username",type:"text"})),r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Contrase\xf1a"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.password,name:"password",type:"password"})),r.a.createElement(x.a,{variant:"dark",type:"submit"},"Iniciar sesi\xf3n")))))}}]),a}(n.Component),R=function e(){var t=this;Object(s.a)(this,e),this.handleUpload=function(e){return t.service.post("/upload",e)},this.service=p.a.create({baseURL:"".concat("https://car-two-go.herokuapp.com/api","/files"),withCredentials:!0})},q=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).componentDidMount=function(){var e=n.props.match.params.id;n.authService.getUser(e).then((function(e){return n.updateUserState(e.data)})).catch((function(e){return console.log(e)}))},n.updateUserState=function(e){n.setState({username:e.username||"",name:e.name||"",lastName:e.lastName||"",email:e.email||"",phone:e.phone||"",role:e.role,imageUrl:e.imageUrl||""})},n.handleFileUpload=function(e){var t=new FormData;t.append("imageUrl",e.target.files[0]),n.filesService.handleUpload(t).then((function(e){console.log("Subida de archivo finalizada! La URL de Cloudinray es: ",e.data.secure_url),n.setState({imageUrl:e.data.secure_url})})).catch((function(e){return console.log(e)}))},n.handleInputChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(F.a)({},a,r))},n.handleFormSubmit=function(e){e.preventDefault();var t=n.props.match.params.id;n.props.location.pathname.includes("edit")?n.editUser(t,n.state):n.signUp()},n.signUp=function(){n.authService.signUp(n.state).then((function(){return n.props.history.push("/")})).catch((function(e){return console.log(e)}))},n.editUser=function(e,t){n.authService.editUser(e,t).then((function(e){n.props.setTheUser(e.data),n.props.history.push("/perfil")})).catch((function(e){return console.log(e)}))},n.state={username:"",password:"",name:"",lastName:"",email:"",phone:"",role:"",imageUrl:""},n.authService=new h,n.filesService=new R,n}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(M.a,{as:"main"},r.a.createElement(A.a,null,r.a.createElement(G.a,{md:{offset:3,span:6}},this.props.location.pathname.includes("edit")?r.a.createElement("h3",null,"Edita tu perfil"):r.a.createElement("h3",null,"Formulario de Registro"),r.a.createElement("hr",null),r.a.createElement(D.a,{onSubmit:this.handleFormSubmit},r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Nombre de Usuario *"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.username,name:"username",type:"text"})),this.props.location.pathname.includes("signup")?r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Contrase\xf1a *"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.password,name:"password",type:"password"}),r.a.createElement(D.a.Text,{className:"text-muted"},"La contrase\xf1a debe ser al menos de cuatro caracteres")):null,r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Nombre *"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.name,name:"name",type:"text"})),r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Apellido"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.lastName,name:"lastName",type:"text"})),r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Email *"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.email,name:"email",type:"email",placeholder:"tuemail@email.com"})),r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Tel\xe9fono M\xf3vil *"),r.a.createElement(D.a.Control,{onChange:this.handleInputChange,value:this.state.phone,name:"phone",type:"number"})),r.a.createElement(D.a.Group,{controlId:"exampleForm.ControlSelect1"},r.a.createElement(D.a.Label,null,"Selecciona el tipo de cuenta que quieres *"),r.a.createElement(D.a.Control,{as:"select",onChange:this.handleInputChange,value:this.state.role,name:"role"},r.a.createElement("option",null,"Seleccione un perfil de cuenta"),r.a.createElement("option",null,"Conductor"),r.a.createElement("option",null,"Pasajero"))),this.props.location.pathname.includes("edit")?r.a.createElement(D.a.Group,null,r.a.createElement(D.a.Label,null,"Imagen de Perfil"),r.a.createElement(D.a.Control,{name:"imageUrl",type:"file",onChange:this.handleFileUpload})):null,r.a.createElement(x.a,{variant:"dark",type:"submit"},"Enviar")))))}}]),a}(n.Component),B=a(6),z=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).setTheUser=function(t){return e.setState({loggedInUser:t},(function(){return console.log("Cambio en el estado:",e.state)}))},e.fetchUser=function(){e.AuthService.isLoggedIn().then((function(t){return null===e.state.loggedInUser&&e.setState({loggedInUser:t.data})})).catch((function(e){return console.log({err:e})}))},e.state={loggedInUser:null},e.AuthService=new h,e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return this.fetchUser(),r.a.createElement(r.a.Fragment,null,r.a.createElement(f,{setTheUser:this.setTheUser,loggedInUser:this.state.loggedInUser}),r.a.createElement(B.d,null,r.a.createElement(B.b,{exact:!0,path:"/",render:function(){return r.a.createElement(T,null)}}),r.a.createElement(B.b,{path:"/login",render:function(t){return r.a.createElement(P,Object.assign({},t,{setTheUser:e.setTheUser}))}}),r.a.createElement(B.b,{path:"/signup",render:function(t){return r.a.createElement(q,Object.assign({},t,{setTheUser:e.setTheUser}))}}),r.a.createElement(B.b,{path:"/mapa",render:function(){return r.a.createElement(w,null)}}),r.a.createElement(B.b,{path:"/conductor",render:function(){return r.a.createElement(L,null)}}),r.a.createElement(B.b,{path:"/perfil",render:function(t){return e.state.loggedInUser?r.a.createElement(N,Object.assign({loggedInUser:e.state.loggedInUser,setTheUser:e.setTheUser},t)):r.a.createElement(B.a,{to:"/login"})}}),r.a.createElement(B.b,{path:"/profile/:id/edit",render:function(t){return e.state.loggedInUser?r.a.createElement(q,Object.assign({loggedInUser:e.state.loggedInUser,setTheUser:e.setTheUser},t)):r.a.createElement(B.a,{to:"/login"})}})))}}]),a}(n.Component);o.a.render(r.a.createElement(E.a,null,r.a.createElement(r.a.StrictMode,null,r.a.createElement(z,null))),document.getElementById("root"))},61:function(e,t,a){e.exports=a.p+"static/media/kisspng-map-drawing-pin-clip-art-map-marker-5b0bc686f2e9c7.724277061527498374995.66406733.png"},62:function(e,t,a){e.exports=a(116)},67:function(e,t,a){},68:function(e,t,a){}},[[62,1,2]]]);
//# sourceMappingURL=main.76c580c8.chunk.js.map