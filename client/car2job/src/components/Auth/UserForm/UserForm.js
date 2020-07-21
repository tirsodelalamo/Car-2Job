import React, { Component } from 'react'

import AuthService from '../../../service/AuthService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class UserForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            name: '',
            lastName: '',
            email: '',
            phone: '',
            role: ''
        }
        this.authService = new AuthService()
    }

    // componentDidMount = () => {

    //     const id = this.props.match.params.id

    //     this.authService
    //         .getUser(id)
    //         .then(res => this.updateUserState(res.data))
    //         .catch(err => console.log(err))
    // }

    // updateUserState = data => {

    //     this.setState({
    //         username: data.username || "",
    //         name: data.name || "",
    //         lastName: data.lastName || "",
    //         email: data.email || "",
    //         phone: data.phone || "",
    //         role: data.role            
    //     })
    // }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const id = this.props.match.params.id
        this.props.location.pathname.includes('editar') ? this.editUser(id, this.state) : this.signUp()        
    }

    signUp = () => {
        this.authService
            .signUp(this.state)
            .then (() => this.props.history.push('/'))
            .catch(err => console.log(err))
        
    }

    editUser = (id, user) => {
        this.authService
            .editUser(id, user)
            .then(() => this.props.history.push('/perfil'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container as="main">
                <Row>
                    <Col md={{ offset: 3, span: 6}}>
                        {this.props.location.pathname.includes('editar') ? <h3>Edita tu perfil</h3> : <h3>Formulario de Registro</h3>}
                        <hr></hr>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre de Usuario *</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña *</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">La contraseña debe ser al menos de cuatro caracteres</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre *</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.lastName} name="lastName" type="text" />
                            </Form.Group>    
                            <Form.Group>
                                <Form.Label>Email *</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.email} name="email" type="email" placeholder = "tuemail@email.com" />
                            </Form.Group> 
                            <Form.Group>
                                <Form.Label>Teléfono Móvil *</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.phone} name="phone" type="number" />
                            </Form.Group> 
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Selecciona el tipo de cuenta que quieres *</Form.Label>
                                <Form.Control as = "select" onChange={this.handleInputChange} value={this.state.role} name="role" >
                                    <option>Seleccione un perfil de cuenta</option>
                                    <option>Conductor</option>
                                    <option>Pasajero</option>
                                </Form.Control>
                            </Form.Group> 
                            <Button variant="dark" type="submit">Enviar</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default UserForm