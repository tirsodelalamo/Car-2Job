const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/User.model")
const bcrypt = require("bcrypt")

router.get('/:id/edit', (req, res, next) => {

    User
        .findById(req.params.id)
        .then((user) => res.json(user))
        .catch((error) => console.log(error))
})

router.put('/:id/edit', (req, res, next) => {
    
    const {
      username,
      name,
      lastName,
      email,
      phone,
      role,
      imageUrl
    } = req.body

    console.log('Entra el back')

    

    User.findByIdAndUpdate(req.params.id, {username, name, lastName, email, phone, role, imageUrl}, {new: true})
      .then((user) => res.json(user))
      .catch((err) => console.log(err))      
})

module.exports = router