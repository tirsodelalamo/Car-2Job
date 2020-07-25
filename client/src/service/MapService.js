import axios from 'axios'

export default class MapService {

    constructor() {

        this.service = axios.create({

            baseURL: 'http://localhost:5000/api/mapa', //CAMBIAR PARA DEPLOY
            withCredentials: true
        })
    }

    getAllTravels = () => this.service.get('/lista')
    getOneTravel = id => this.service.get(`/detalleRuta/${id}`)
    createTravel = travel => this.service.post(`/nuevaRuta`, travel)
    deleteTravel = id => this.service.delete(`/detalleRuta/${id}/delete`)


}