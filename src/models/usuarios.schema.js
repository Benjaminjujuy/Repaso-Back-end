const { Schema, model } = require(`mongoose`)



const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        trim: true
    },
    contrasenia: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        default: `Usuario`,
        required: true,
        trim: true
    },
    bloqueado: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    const { contrasenia, __v, ...usuario } = this.toObject()
    return usuario
}

const usuariosModel = model(`usuario`, usuarioSchema)
module.exports = usuariosModel