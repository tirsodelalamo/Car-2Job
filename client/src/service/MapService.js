import axios from 'axios'

export default class MapService {

    constructor() {

        this.service = axios.create({

            baseURL: 'http://localhost:5000/api', //CAMBIAR PARA DEPLOY
            withCredentials: true
        })
    }

    getAllTravels = () => this.service.get('/lista-viajes')
    getOneTravel = id => this.service.get(`/detalleRuta/${id}`)
    createTravel = travel => this.service.post(`/mapa/nuevaRuta`, travel)
    deleteTravel = id => this.service.delete(`/detalleRuta/${id}/delete`)
    updateTravel = (id, travel) => this.service.put(`/detalleRuta/${id}/edit`, travel)
    getAllTravelsFromUser = id => this.service.get(`/perfil/${id}/rutas`)


}