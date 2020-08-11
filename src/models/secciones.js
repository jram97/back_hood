const mongoose = require('mongoose')
const {Schema} = mongoose

const SeccionesSchema = new Schema({
    nombre:{
        type:String
    },
    multiple:{
        type:Boolean
    },
    limiteOpciones:{
        type:Number,
        default: 0
    },
    opciones:{
        type:Array,
        default:[]
    }

})

module.exports = mongoose.model("Section", SeccionesSchema);