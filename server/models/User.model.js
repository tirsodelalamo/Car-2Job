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
        enum: ['ADMIN', 'Conductor', 'Pasajero']
    },
    imageUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dagpyusfp/image/upload/v1595351796/Car2Job/iconfinder-3-avatar-2754579_120516_t2fms7.png'
    }
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User