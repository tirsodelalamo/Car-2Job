import axios from 'axios'

export default class AuthService {

    constructor() {

        this.service = axios.create({

            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    login = credentials => this.service.post('/login', credentials)
    editUser = (id, user) => this.service.post(`/perfil/${id}/editar`, user) 
    //getUser = (id) => this.service.get(`/perfil/${id}`)
    signUp = credentials => this.service.post('/signup', credentials)
    logout = () => this.service.post('/logout')
    isLoggedIn = () => this.service.get('/loggedin')

}