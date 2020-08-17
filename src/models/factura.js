const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacturaSchema = new Schema({
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    detalle: [{
        platillo:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Menu'
        }],
        secciones:[{
            section: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Section',
                require: false
            }],
            option:[{
                type:Array,
            }]
        }],
    }],
    cantidad:{
        type:Number,
        default:0,
    },
    total: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Cancelado', 'Rechazado'],
        default: 'Pendiente'
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Factura', FacturaSchema);
