const mongoose = require("mongoose");
const { Schema } = mongoose;

const MenuSchema = new Schema({

  nombre: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    default: 0
  },
  foto: {
    type: String,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  tamanio: {
    type: String,
    enum: ['Extra', 'Pequeño', 'Mediano', 'Grande', 'Extra Grande', 'Jumbo', 'XL'],
    default: 'Pequeño'
  },
  secciones:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Seccion"
  }],
  estado: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model("Menu", MenuSchema);
