const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');
//const uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: false,
        default: ''
    },
    usuario: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        lowercase: true
    },
    foto: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    popular: {
        type: Boolean,
        default: false
    },
    direccion: {
        type: String,
        required: false,
        default: ''
    },
    correo: {
        type: String,
        required: false,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true,
    },
    latitud: {
        type: String,
        required: false,
        default: ''
    },
    longitud: {
        type: String,
        required: false,
        default: ''
    },
    role: {
        type: String,
        enum: ['isAdmin', 'isEnterprise', 'isClient', 'isDelivery'],
        default: 'isClient'
    },
    num_votes: {
        type: Number,
        default: 0
    },
    total_score: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

//UsuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico'} );

UsuarioSchema.methods.encryptPassword = async (contrasenia) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasenia, salt);
    return hash;
};

UsuarioSchema.methods.matchPassword = async function (contrasenia) {
    return await bcrypt.compare(contrasenia, this.contrasenia);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
