const { validationResult } = require("express-validator")
const serviciosDeProductos = require(`../services/productos.services`)

const crearProducto = async (req, res) => {
   const errors = validationResult(req)

   if(!errors.isEmpty()){
     return res.status(400).json({msg: errors.array()})
   }
 
    const result = await serviciosDeProductos.nuevoProducto(req.body)

    if(result.statusCode === 201){
    res.status(201).json({msg: result.msg})
    }else{
    res.status(500).json({msg: result.msg})
    }
   }

const traerTodosLosProductos = async (req, res) => {
   const result = await serviciosDeProductos.obtenerProductos()
   if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, productos: result.productos})
   }else{
    res.status(500).json({msg: result.msg})
   }
   }

const traerUnProducto = async (req,res) => {
   const result = await serviciosDeProductos.obtenerProducto(req.params.idProducto)
   if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
   }else{
    res.status(500).json({msg: result.msg})
   }
  }

const actualizarUnProducto = async (req,res) => {
   const errors = validationResult(req)

   if(!errors.isEmpty()){
     return res.status(400).json({msg: errors.array()})
   }
 
   const result = await serviciosDeProductos.actualizarProducto(req.params.idProducto, req.body)

   if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
   }else{
    res.status(500).json({msg: result.msg})
   }   
}

const eliminarUnProducto = async (req,res) => {
    const result = await serviciosDeProductos.eliminarProducto(req.params.idProducto)
    if(result.statusCode === 200){
     res.status(200).json({msg: result.msg})
    }else{
     res.status(500).json({msg: result.msg})
    } 
}

const agregarImagenProducto = async(req,res) =>{
    const result = await serviciosDeProductos.imagenProducto(req.params.idProducto, req.file)
    if(result.statuscode === 200){
      res.status(200).json({msg: result.msg})
     }else{
      res.status(500).json({msg: result.msg})
     } 
}

const agregarProductosAlCarrito =async (req, res) => {
   const result = await serviciosDeProductos.agregarProductoCarrito(req.params.idProducto, req.idUsuario)
   if(result.statuscode === 200){
     res.status(200).json({msg: result.msg})
    }else{
     res.status(500).json({msg: result.msg})
    } 
}

const agregarProductosAlFavorito = async (req, res) => {
   const result = await serviciosDeProductos.agregarProductoFav(req.params.idProducto, req.idUsuario)
   if(result.statuscode === 200){
     res.status(200).json({msg: result.msg})
    }else{
     res.status(500).json({msg: result.msg})
    } 
}

const borrarProductoDeCarrito = async () => {
   const result = await serviciosDeProductos.borrarProductoCarrito(req.params.idProducto, req.idUsuario)
   if(result.statuscode === 200){
     res.status(200).json({msg: result.msg})
    }else{
     res.status(500).json({msg: result.msg})
    } 
}

const borrarProductoDeFavoritos = async () => {
   const result = await serviciosDeProductos.borrarProductoFav(req.params.idProducto, req.idUsuario)
   if(result.statuscode === 200){
     res.status(200).json({msg: result.msg})
    }else{
     res.status(500).json({msg: result.msg})
    } 
}


   module.exports = {
    crearProducto,
    traerTodosLosProductos,
    traerUnProducto,
    actualizarUnProducto,
    eliminarUnProducto,
    agregarImagenProducto,
    agregarProductosAlCarrito,
    agregarProductosAlFavorito,
    borrarProductoDeCarrito,
    borrarProductoDeFavoritos
   }