const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')

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

router.get('/:id/edit', checkAuth, (req, res, next) => {

    User
        .findById(req.params.id)
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
      vehicle
    } = req.body

    User.findByIdAndUpdate(req.params.id, {username, name, lastName, email, phone, role, imageUrl, vehicle}, {new: true})
      .then((user) => res.json(user))
      .catch((err) => console.log(err))      
})



module.exports = router