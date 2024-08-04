const serviciosDeUsuarios = require(`../services/usuarios.services`)

const crearUsuario = (req, res) => {
  const result = serviciosDeUsuarios.nuevoUsuario(req.body)

  if(result.statusCode === 201){
    res.staus(201).json({msg: result.msg})
    }else{
    res.staus(500).json({msg: result.msg})
    }
}

const traerTodosLosUsuarios = (req, res) => {
  const result = serviciosDeUsuarios.obtenerUsuarios()

  if(result.statusCode === 200){
    res.staus(200).json({msg: result.msg})
    }else{
    res.staus(500).json({msg: result.msg})
    }
}

const traerUnUsuario = (req, res) => {
    const result = serviciosDeUsuarios.obtenerUsuario(req.params.idUsuario)

    if(result.statusCode === 200){
        res.staus(200).json({msg: result.msg})
        }else{
        res.staus(500).json({msg: result.msg})
        }
}

const actualizarUnUsuario = (req, res) => {
    const result = serviciosDeUsuarios.actualizarUnUsuario(req.params.idUsuario, req.body)

    if(result.statusCode === 201){
        res.staus(200).json({msg: result.msg})
        }else{
        res.staus(500).json({msg: result.msg})
        }
}

const eliminarUnUsuario = (req, res) => {
    const result = serviciosDeUsuarios.eliminarUnUsuario(req.params.idUsuario)

    if(result.statusCode === 201){
        res.staus(200).json({msg: result.msg})
        }else{
        res.staus(500).json({msg: result.msg})
        }
} 

module.exports = {
    crearUsuario,
    traerTodosLosUsuarios,
    traerUnUsuario,
    actualizarUnUsuario,
    eliminarUnUsuario
}