const mongoose = require("mongoose");
const { Schema } = mongoose;

const DireccionSchema = new Schema({

    nombre: {
        type: String,
    },
    latitud: {
        type: String,
        default: ""
    },
    longitud: {
        type: String,
        default: ""
    },
    referencia: {
        type: String,
        default: ""
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }

}, { timestamps: true });

module.exports = mongoose.model("Direccion", DireccionSchema);
