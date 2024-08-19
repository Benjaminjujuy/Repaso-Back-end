const cloudinary = require("../helpers/cloudinary")
const ProductosModel = require(`../models/productos.schema`)
const usuariosModel = require("../models/usuarios.schema")

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

const imagenProducto = async(idProducto, file) => {
    try {
      const producto = await ProductosModel.findById(idProducto)
      const imagen = await cloudinary.uploader.upload(file.path)
      producto.imagen = imagen.secure_url
      await producto.save()

      return{
        msg:`Imagen cargada`,
        statuscode: 200
      }
        
    } catch (error) {
       return{
       msg: `Error al crear Imagen`,
       statuscode: 500,
       error
    }
}
}

const agregarProductoFav = async(idProducto, idUsuario) => {
    try {
        const producto = await ProductosModel.findById(idProducto)
        const usuario = await usuariosModel.findById(idUsuario)

        const productoExiste = usuario.favoritos.find((prod) => prod.id === idProducto)

        if(productoExiste){
            return{
                msg: `Producto ya existe en favoritos`,
                statuscode: 400
            }  
        }
     
        usuario.favoritos.push(producto)
        await usuario.save()

        return{
            msg: `Producto agregado a favoritos`,
            statuscode: 200
        }

    } catch (error) {
        return{
            statuscode:500,
            msg:`Error al agregar producto al favorito`
        }
    }
}

const agregarProductoCarrito = async(idProducto, idUsuario) => {
    try {
        const producto = await ProductosModel.findById(idProducto)
        const usuario = await usuariosModel.findById(idUsuario)

        const productoExiste = usuario.carrito.find((prod) => prod.id === idProducto)

        if(productoExiste){
            return{
                msg: `Producto ya existe en el carrito`,
                statuscode: 400
            }  
        }
     
        usuario.carrito.push(producto)
        await usuario.save()

        return{
            msg: `Producto agregado al carrito`,
            statuscode: 200
        }

    } catch (error) {
        return{
            statuscode:500,
            msg:`Error al agregar producto al carrito`
        }
    }
}

const borrarProductoFav = async(idProducto, idUsuario) => {
    try {
        const usuario = await usuariosModel.findById(idUsuario)

        const posicionProducto = usuario.favoritos.findIndex((prod) => prod.id === idProducto)

        usuario.favoritos.splice(posicionProducto, 1)
        await usuario.save()

        return{
            msg: `Producto borrado de favoritos`,
            statuscode: 200
        }

    } catch (error) {
        return{
            statuscode:500,
            msg:`Error al borrar producto de favorito`
        }
    }
}

const borrarProductoCarrito = async(idProducto, idUsuario) => {
    try {
        const usuario = await usuariosModel.findById(idUsuario)

        const posicionProducto = usuario.carrito.findIndex((prod) => prod.id === idProducto)

        usuario.carrito.splice(posicionProducto, 1)
        await usuario.save()

        return{
            msg: `Producto borrado del carrito`,
            statuscode: 200
        }

    } catch (error) {
        return{
            statuscode:500,
            msg:`Error al borrar producto del carrito`
        }
    }
}


module.exports = {
    nuevoProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
    imagenProducto,
    agregarProductoFav,
    agregarProductoCarrito,
    borrarProductoFav,
    borrarProductoCarrito
}