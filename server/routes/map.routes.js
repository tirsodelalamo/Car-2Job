const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const Travel = require("../models/Travel.model")
const checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')


router.get('/lista', checkAuth, (req, res, next) => {

    Travel.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/detalleRuta/:id', checkAuth, (req, res, next) => {

    Travel.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/nuevaRuta', checkAuth, (req, res, next) => {

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