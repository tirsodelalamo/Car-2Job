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
      // password,
      name,
      lastName,
      email,
      phone,
      role,
      pocket,
    } = req.body

    console.log('Entro')

    

    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((user) => res.json(user))
      .catch((err) => console.log(err))      
})

module.exports = router