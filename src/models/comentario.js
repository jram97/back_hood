const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComentarioSchema = new Schema({

    comentario: {
        type: String
    },
    rating: {
        type: Number
    },
    por_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    para_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: false
    },
    para_menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        require: false
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Comentario', ComentarioSchema);
