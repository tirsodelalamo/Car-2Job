const express = require("express")
const router = express.Router()

const Travel = require("../models/Travel.model")
const checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')


router.get('/lista-viajes', checkAuth, (req, res, next) => {

    Travel.find({status: "Pendiente"})
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/perfil/:usuarioId/rutasPasajero', checkAuth, (req, res, next) => {

    Travel.find({owner: req.params.usuarioId})
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/perfil/:usuarioId/rutasConductor', checkAuth, (req, res, next) => {

    Travel.find({driver: req.params.usuarioId})
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/detalleRuta/:id', checkAuth, (req, res, next) => {

    Travel.findById(req.params.id)
        .populate("owner")
        .populate({
            path: "driver",
            populate: "vehicle"
        })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/detalleRuta/:id/edit', checkAuth, (req, res, next) => {
    
    let statusProcessed = ""

    if(req.body.statusDetail === "Aceptar") {
        statusProcessed = {status: 'En proceso', driver: req.body.driver}

    } else if (req.body.statusDetail === "Rechazar") {
        statusProcessed = {status: 'Pendiente', driver: undefined}

    } else {
        statusProcessed = {status: 'Confirmado'}
    }

    Travel.findByIdAndUpdate(req.params.id, statusProcessed, {new: true})
      .then((travel) => res.json(travel))
      .catch((err) => console.log(err))      
})

router.post('/mapa/nuevaRuta', checkAuth, (req, res, next) => {


    Travel.create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete('/detalleRuta/:id/delete', checkAuth, (req, res, next) => {

    Travel.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router