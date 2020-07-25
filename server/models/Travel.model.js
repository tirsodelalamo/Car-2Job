const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelSchema = new Schema({
    
    origin: {
        type: String
    },
    destination: {
        type: String
    },
    travelTime: {
        type: Number
    },
    distance: {
        type: Number
    },
    arrivalTime: {
        type: String
    },
    price: {
        type: Number
    },
    owner: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['Pendiente', 'En proceso', 'Confirmado'],
        default: "Pendiente"
    }
    },{
        timestamps: true,
    }
);

const Travel = mongoose.model("Travel", travelSchema);

module.exports = Travel;
