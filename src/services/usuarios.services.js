const usuariosModel = require(`../models/usuarios.schema`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)


const nuevoUsuario = async(usuario) => {
    try {

        const usuarioExiste = await usuariosModel.findOne({nombreUsuario: body.nombreUsuario})

        if(usuarioExiste){
            return{
                msg: `Usuario no disponible`,
                statusCode: 409,
            }
        }

        const usuario = new usuariosModel(body)

        let salt = bcrypt.genSaltSync();
        usuario.contrasenia = bcrypt.hashSync(body.contrasenia, salt);

        await usuario.save()
        return{
            msg:`Usuario creado`,
            statusCode: 201
        }
    } catch (error) {
        return{
            msg:`Error al crear usuario`,
            statusCode: 500, 
            error
        }
    }
    }

    const obtenerUsuarios = async() => {
        try {
            const usuario = await usuariosModel.find()
         return{
            usuario,
            statusCode: 200
         }   
        } catch (error) {
            return{
                msg:`Error al obtener Usuarios`,
                statusCode: 500, 
                error
            } 
        }
    }

    const obtenerUsuario = async(idUsuario) =>{
        try {
            const usuario = await usuariosModel.findById(idUsuario)
           return{
               usuario,
               statusCode: 200
           }
        } catch (error) {
           return{
               msg:`Error al obtener usuario`,
               statusCode: 500, 
               error
           } 
        }
       }

       const actualizarUsuario = async(idUsuario, body) => {
        try {
             await usuariosModel.findByIdAndUpdate({_id: idUsuario}, body)
        
            return{
                msg:`Usuario actualizado`,
                statusCode: 200
            }
        } catch (error) {
            return{
                msg:`Error al crear usuario`,
                statusCode: 500, 
                error
            } 
        }
    }  

    const eliminarUsuario = async(idUsuario) => {
        await usuariosModel.findByIdAndDelete()

        if(usuarioExiste){
            await usuariosModel.findByIdAndDelete({_id: idUsuario})
            return{
                msg: `Usuario eliminado correctamente`,
                statusCode: 200
            }
        }else{
            return{
                msg: `ID Incorrecto`,
                statusCode: 400
            }
        }
    }  

    const inicioSesionUsuario = async(body) => {
       const usuarioExiste = await usuariosModel.findOne({nombreUsuario: body.nombreUsuario})
       if(!usuarioExiste){
        return {
            msg: `Usuario y/o contrasenia incorrecta. USUARIO`,
            statusCode: 400
        }
       }

       const checkContrasenia = bcrypt.compareSync(body.contrasenia, usuarioExiste.contrasenia)

       if(!checkContrasenia){
        return {
            msg: `Usuario y/o contrasenia incorrecta. CONTRASENIA`,
            statusCode: 400
        }
       }
       
      const payload = {
        idUsuario: usuarioExiste._id,
        rol: usuarioExiste.rol
      }

      const token = jwt.sign(payload.process.env.JWT_SECRET)

      return{
        token,
        rol: usuarioExiste.rol,
        msg: `Usuario logueado`,
        statusCode: 200
      }
    }
    
module.exports = {
    nuevoUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    inicioSesionUsuario
}