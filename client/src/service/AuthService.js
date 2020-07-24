import axios from 'axios'

export default class AuthService {

    constructor() {

        this.service = axios.create({

            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    login = credentials => this.service.post('/login', credentials)
    editUser = (id, user) => this.service.put(`/profile/${id}/edit`, user) 
    getUser = (id) => this.service.get(`/profile/${id}/edit`)
    signUp = credentials => this.service.post('/signup', credentials)
    logout = () => this.service.post('/logout')
    isLoggedIn = () => this.service.get('/loggedin')

}