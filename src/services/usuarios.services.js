

const nuevoUsuario = (usuario) => {
    try {
        usuarios.push({id: crypto.randomUUID(), usuario})
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

    const obtenerUsuarios = () => {
        try {
         return{
            usuarios,
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

    const obtenerUsuario = (idUsuario) =>{
        try {
           const usuario = usuarios.find((prod) => prod.id === idUsuario)
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

       const actualizarUsuario = (idUsuario) => {
        try {
            const posicionUsuario = usuarios.findIndex((user) => user.id === idUsuario)
        
            const UsuarioActualizado = {
                id,
                ...req.body
            }
            usuarios[posicionUsuario] = UsuarioActualizado
        
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

    const eliminarUsuario = (idUsuario) => {
        const posicionUsuario = usuarios.findIndex((user) => user.id === idUsuario)
        usuarios.splice(posicionUsuario, 1) 
        return{
            msg: `Usuario eliminado correctamente`,
            statusCode: 200
        }
    }  
    
module.exports = {
    nuevoUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
}