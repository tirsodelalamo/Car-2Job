const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    
    brand: {
        type: String
    },
    model: {
        type: String
    },
    fuel: {
        type: String,
        enum: ['Diésel', 'Gasolina', 'Eléctrico', 'Híbrido']
    },
    plate: {
        type: String
    }
    },{
        timestamps: true,
    }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
