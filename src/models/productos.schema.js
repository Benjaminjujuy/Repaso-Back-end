const { Schema, model} = require(`mongoose`)

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trin: true
    },
    precio:{
        type: Number,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
        trin: true
    },
    imagen:{
        type: String,
        default: ``
    },
    carrito:[],
    favoritos:[]
})

const ProductosModel = model(`productos`, productoSchema)
module.exports = ProductosModel