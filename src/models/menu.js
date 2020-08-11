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
  secciones:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
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
