// CLOUDINARYCONFIG

import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/files',
            withCredentials: true
        })
    }

    handleUpload = theFile => this.service.post('/upload', theFile)
}