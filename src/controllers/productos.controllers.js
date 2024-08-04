const serviciosDeProductos = require(`../services/productos.services`)

const crearProducto = (req, res) => {
    const result = serviciosDeProductos.nuevoProducto(req.body)
    if(result.statusCode === 201){
    res.staus(201).json({msg: result.msg})
    }else{
    res.staus(500).json({msg: result.msg})
    }
   }

const traerTodosLosProductos = (req, res) => {
   const result = serviciosDeProductos.obtenerProductos()

   if(result.statusCode === 200){
    res.staus(200).json({msg: result.msg})
   }else{
    res.staus(500).json({msg: result.msg})
   }
   }

const traerUnProducto = (req,res) => {
   const result = serviciosDeProductos.obtenerProducto(req.params.idProducto)

   if(result.statusCode === 200){
    res.staus(200).json({msg: result.msg})
   }else{
    res.staus(500).json({msg: result.msg})
   }
  }

const actualizarUnProducto = (req,res) => {
   const result = serviciosDeProductos.actualizarProducto(req.params.idProducto, req.body)

   if(result.statusCode === 200){
    res.staus(200).json({msg: result.msg})
   }else{
    res.staus(500).json({msg: result.msg})
   }   
}

const eliminarUnProducto = (req,res) => {
    const result = serviciosDeProductos.eliminarProducto(req.params.idProducto)

    if(result.statusCode === 200){
     res.staus(200).json({msg: result.msg})
    }else{
     res.staus(500).json({msg: result.msg})
    } 
}


   module.exports = {
    crearProducto,
    traerTodosLosProductos,
    traerUnProducto,
    actualizarUnProducto,
    eliminarUnProducto
   }