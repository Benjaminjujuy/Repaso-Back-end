const ProductosModel = require(`../models/productos.schema`)

const nuevoProducto = async(body) => {
try {
    const producto = new ProductosModel(body)
    await producto.save()

    return{
        msg:`Producto creado`,
        statusCode: 201
    }
} catch (error) {
    return{
        msg:`Error al crear producto`,
        statusCode: 500, 
        error
    }
}
}

const obtenerProductos = async() => {
    try {
     const productos = await ProductosModel.find()

     return{
        productos,
        statusCode: 200
     }   
    } catch (error) {
        return{
            msg:`Error al crear producto`,
            statusCode: 500, 
            error
        } 
    }
}

const obtenerProducto = async(idProducto) =>{
 try {
    const producto = await ProductosModel.findById(idProducto)

    return{
        producto,
        statusCode: 200
    }
 } catch (error) {
    return{
        msg:`Error al crear producto`,
        statusCode: 500, 
        error
    } 
 }
}

const actualizarProducto = async(idProducto, body) => {
    try {
        await ProductosModel.findByIdAndUpdate({_id: idProducto}, body)

        return{
            msg:`Producto actualizado`,
            statusCode: 200
        }
    } catch (error) {
        return{
            msg:`Error al crear producto`,
            statusCode: 500, 
            error
        } 
    }
}

const eliminarProducto = async(idProducto) => {
    const productoExiste = await ProductosModel.findById(idProducto)

    if(productoExiste){
        await ProductosModel.findByIdAndDelete({_id: idProducto})
        return{
            msg: `Producto eliminado correctamente`,
            statusCode: 200
        }
    }else{
        return{
            msg: `ID Incorrecto`,
            statusCode: 400
        }
    }
}


module.exports = {
    nuevoProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}