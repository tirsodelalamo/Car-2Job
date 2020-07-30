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
        default: 100
    },
    vehicle: {
        type: mongoose.ObjectId,
        ref: "Car"
    }, 
    role: {
        type: String,
        enum: ['ADMIN', 'Conductor', 'Pasajero']
    },
    imageUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dagpyusfp/image/upload/v1596124343/Car2Job/PngItem_786293_m62oxn.png'
    },
    numberOfRating: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    averageRate: {
        type: Number,
        default: 0
    }
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User