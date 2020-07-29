const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const Car = require("../models/Car.model")
const Travel = require("../models/Travel.model")

const checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')

router.post('/:id/nuevo-vehiculo', (req, res, next) => {

    Car.create(req.body)
      .then(vehicle => 
        User.findByIdAndUpdate(req.params.id, {vehicle: vehicle._id}, {new: true}))
        .then(response => res.json(response))
      .catch((err) => console.log(err));
})

router.put('/detalleRuta/:id/edit', checkAuth, (req, res, next) => {

  let newPocket = {}
  const ownerPocket = req.body.travelDetails.owner.pocket
  const driverPocket = req.body.travelDetails.driver.pocket
  const ownerId = req.body.travelDetails.owner._id

  req.params.id.includes(ownerId) ? newPocket = {pocket: ownerPocket} : newPocket = {pocket: driverPocket}


  User.findByIdAndUpdate(req.params.id, newPocket, {new: true})
    .then((user) => res.json(user))
    .catch((err) => console.log(err))      
})

router.put('/detalleRuta/:travelId/edit/:driverId', checkAuth, (req, res, next) => {

  let newRated = {rated: "Yes"}
  const counterRating = req.body.travelDetails.driver.numberOfRating
  const totalRating = req.body.travelDetails.driver.rating
  const averageRating = totalRating/counterRating

  Travel
    .findByIdAndUpdate(req.params.travelId, newRated, {new: true})
    .then(() =>
      User.findByIdAndUpdate(req.params.driverId, {numberOfRating: counterRating, averageRate: averageRating, rating: totalRating}, {new: true}))
          .then(response => res.json(response))
          .catch((err) => console.log(err));
})

router.get('/:id/edit', checkAuth, (req, res, next) => {

    User
        .findById(req.params.id)
        .populate("vehicle")
        .then((user) => res.json(user))
        .catch((error) => console.log(error))
})

router.put('/:id/edit', checkAuth, (req, res, next) => {
    
    const {
      username,
      name,
      lastName,
      email,
      phone,
      role,
      imageUrl,
 
    } = req.body

    User.findByIdAndUpdate(req.params.id, {username, name, lastName, email, phone, role, imageUrl}, {new: true})
      .then((user) => res.json(user))
      .catch((err) => console.log(err))      
})


module.exports = router