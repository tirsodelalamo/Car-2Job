import React, {Component} from 'react'


import AuthService from '../../../service/AuthService'
import "bootstrap/dist/css/bootstrap.min.css"

class PublicProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo: undefined
        }
    }

    // componentDidMount = () => {

    //     const id = this.props

    //     this.authService.
    //         getUser(id)
    //         .then(res => this.updateUserState(res.data))
    //         .catch(err => console.log(err))

    //     }

    render(){

        console.log("AQUI TIENES LAS PROPS", this.props)
        console.log("AQUI TIENES EL ESTADO", this.state)

        return(
            <h1>HOLA</h1>
        )
    }

}

export default PublicProfile