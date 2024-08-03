const productos = []


const crearProducto = (req, res) => {
    const producto = req.body
   
    productos.push({id: crypto.randomUUID(), producto})
    res.send(`Producto creado`)
   }

const traerTodosLosProductos = (req, res) => {
    res.json(productos)
   }

const traerUnProducto = (req,res) => {
    const id = req.params.idProdducto
    const producto = productos.find((prod) => prod.id === id)
    
    res.json(producto)
  }

const actualizarUnProducto = (req,res) => {
    const id = req.params.idProducto
    const posicionProducto = productos.findIndex((prod) => prod.id === id)
    
    const productoActualizado = {
        id,
        ...req.body
    }
    productos[posicionProducto] = productoActualizado

    res.json({msg: `Producto actualizado`})
}

const eliminarUnProducto = (req,res) => {
    const id = req.params.idProducto
    const posicionProducto = productos.findIndex((prod) => prod.id === id)
    productos.splice(posicionProducto, 1)

    res.json({msg: `Producto eliminado`})
}


   module.exports = {
    crearProducto,
    traerTodosLosProductos,
    traerUnProducto,
    actualizarUnProducto,
    eliminarUnProducto
   }