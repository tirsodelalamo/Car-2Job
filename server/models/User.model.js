const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    pocket: {
        type: Number,
        default: 0
    },
    vehicle: {
        type: mongoose.ObjectId,
        ref: "Car"
    }, 
    role: {
        type: String,
        enum: ['ADMIN', 'DRIVER', 'USER']
    }
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User