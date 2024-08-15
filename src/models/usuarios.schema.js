const { Schema, model } = require(`mongoose`)

const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        default: `Usuario`,
        enum: [`usuario`, `admin`]
    },
    bloqueado: {
        type: Boolean,
        default: false
    },
    carrito:[],
    favoritos:[]
})

usuarioSchema.methods.toJSON = function() {
    const { contrasenia, __v, ...usuario } = this.toObject()  
    return usuario
}

const usuariosModel = model(`usuario`, usuarioSchema)
module.exports = usuariosModel