const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoritoSchema = new Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: false
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        require: false
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Favorito', FavoritoSchema);
