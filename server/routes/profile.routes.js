const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/User.model")
const bcrypt = require("bcrypt")

router.get('/:id/profile', (req, res, next) => {

    User
        .findById(req.params.id)
        .then((user) => res.json(user))
        .catch((error) => console.log(error))
})

router.post('/:id/profile', (req, res, next) => {
    
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

    if (!username) {
        res.json({ message: "Introduzca usuario válido" })
        return
    }

    User.findById(req.params.id)
      .then((user) => {
          user.username = username
          user.name = name
          user.lastName = lastName
          user.email = email
          user.phone = phone
          user.role = role
          user.pocket = pocket

        // if (password !== "") {
        //   const salt = bcrypt.genSaltSync(bcryptSalt)
        //   user.password = bcrypt.hashSync(password, salt)
        // }
        user.save()
        return user
      })
      .then((user) => res.json(user))
      .catch((err) => console.log(err))      
})

module.exports = router