const cloudinary = require("../helpers/cloudinary")
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
       msg: `Error al crear producto`,
       statuscode: 500,
       error
    }
}
}

const agregarProductoFav = async(idProducto, idUsuario) => {
    try {
        const producto = await ProductosModel.findById(idProducto)
        const usuario = await UsuariosModel.findById(idUsuario)

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
        const usuario = await UsuariosModel.findById(idUsuario)

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
            msg:`Error al agregar producto al carrito`
        }
    }
}


const borrarProductoFav = async(idProducto, idUsuario) => {
    try {
        const usuario = await UsuariosModel.findById(idUsuario)

        const productoExiste = usuario.favoritos.find((prod) => prod.id === idProducto)

        if(productoExiste){
            return{
                msg: `Producto borrado de favoritos`,
                statuscode: 400
            }  
        }
     
        usuario.favoritos.splice(posicionProducto, 1)
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

const borrarProductoCarrito = async(idProducto, idUsuario) => {
    try {
        const usuario = await UsuariosModel.findById(idUsuario)

        const productoExiste = usuario.favoritos.find((prod) => prod.id === idProducto)

        if(productoExiste){
            return{
                msg: `Producto borrado de carrito`,
                statuscode: 400
            }  
        }
     
        usuario.favoritos.splice(posicionProducto, 1)
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