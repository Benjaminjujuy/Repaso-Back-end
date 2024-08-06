const serviciosDeUsuarios = require(`../services/usuarios.services`)


const crearUsuario = (req, res) => {
  const result = serviciosDeUsuarios.nuevoUsuario(req.body)

  if(result.statusCode === 201){
    res.status(201).json({msg: result.msg})
    }else{
    res.status(500).json({msg: result.msg})
    }
}

const traerTodosLosUsuarios = (req, res) => {
  const result = serviciosDeUsuarios.obtenerUsuarios()

  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
    }else{
    res.status(500).json({msg: result.msg})
    }
}

const traerUnUsuario = (req, res) => {
    const result = serviciosDeUsuarios.obtenerUsuario(req.params.idUsuario)

    if(result.statusCode === 200){
        res.status(200).json({msg: result.msg})
        }else{
        res.status(500).json({msg: result.msg})
        }
}

const actualizarUnUsuario = (req, res) => {
    const result = serviciosDeUsuarios.actualizarUsuario(req.params.idUsuario, req.body)

    if(result.statusCode === 201){
        res.status(200).json({msg: result.msg})
        }else{
        res.status(500).json({msg: result.msg})
        }
}

const eliminarUnUsuario = (req, res) => {
    const result = serviciosDeUsuarios.eliminarUsuario(req.params.idUsuario)

    if(result.statusCode === 201){
        res.status(200).json({msg: result.msg})
        }else{
        res.status(500).json({msg: result.msg})
        }
} 

const iniciarSesion = async(req, res) => {
    const result = await serviciosDeUsuarios.inicioSesionUsuario(req.body)

    if(result.statusCode === 200){
        res.status(200).json({msg: result.msg, rol: result.rol, token: result.token})
    }else{
        res.status(400).json({msg: result.msg})
    }
}

module.exports = {
    crearUsuario,
    traerTodosLosUsuarios,
    traerUnUsuario,
    actualizarUnUsuario,
    eliminarUnUsuario,
    iniciarSesion
}