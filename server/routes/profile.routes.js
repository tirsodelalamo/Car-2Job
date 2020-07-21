const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/User.model")
const bcrypt = require("bcrypt")

// router.get('/:id', (req, res, next) => {

//     User
//         .findById(req.params.id)
//         .then((user) => res.json(user))
//         .catch((error) => console.log(error))
// })

router.post('/:id/editar', (req, res, next) => {
    
    const {
      username,
      password,
      name,
      lastName,
      email,
      phone,
      role,
      pocket,
    } = req.body

    console.log('Entro')

    

    User.findById(req.params.id)
      .then((user) => {
          user.username = username
          user.name = name
          user.lastName = lastName
          user.email = email
          user.phone = phone
          user.role = role
          user.pocket = pocket

        user.save()
        return user
      })
      .then((user) => res.json(user))
      .catch((err) => console.log(err))      
})

module.exports = router