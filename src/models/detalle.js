const mongoose = require('mongoose');
const { Schema } = mongoose;

const DetalleSchema = new Schema({
    menu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu'
    },
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
    cantidad: {
        type: Number,
        default: 0
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Detalle', DetalleSchema);
