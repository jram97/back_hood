const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacturaSchema = new Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    detalle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Detalle',
        require: false
    }],
    total: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Cancelado', 'Rechazado'],
        default: 'Pendiente'
    },
    status: {
        type: Boolean,
        default: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Factura', FacturaSchema);
