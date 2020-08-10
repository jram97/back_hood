const mongoose = require('mongoose');
const { Schema } = mongoose;

const DetalleSchema = new Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        require: false
    },
    direccion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Direccion',
        require: false
    },
    cantidad: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        enum: ['Recibido', 'En Camino', 'Entregado'],
        default: 'Recibido'
    },
    status: {
        type: Boolean,
        default: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Detalle', DetalleSchema);
