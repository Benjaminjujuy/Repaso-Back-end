const express = require(`express`)
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto, 
      agregarProductosAlFavorito, agregarProductosAlCarrito, borrarProductoDeFavoritos,
       borrarProductoDeCarrito, agregarImagenProducto, habilitarUnProducto, deshabilitarUnProducto, 
       obtenerProductoFavUsuario,
       obtenerProductoCarritoUsuario}
     = require("../controllers/productos.controllers")
const { check } = require("express-validator")
const multer = require("../middlewares/multer")
const auth = require("../middlewares/auth")
const { habilitarProducto } = require("../services/productos.services")
const router = express.Router()


router.post(`/`,[
    check(`nombre`, `campo NOMBRE esta vacio`).not().isEmpty(),
    check(`precio`, `campo PRECIO vacio`).isLength({min: 5}),
    check(`descripcion`, `Campo DESCRIPCION vacio`).not().isEmpty()
], crearProducto)
   
router.get(`/`, traerTodosLosProductos)
   
router.get(`/:idProducto`, traerUnProducto)
   
router.get(`/obtenerProdFav`, auth(`usuario`), obtenerProductoFavUsuario)
router.get(`/obtenerProdCart`, auth(`usuario`), obtenerProductoCarritoUsuario)

router.put(`/:idProductos`,[
    check(`nombre`, `campo NOMBRE esta vacio`).not().isEmpty(),
    check(`precio`, `campo PRECIO vacio`).isLength({min: 5}),
    check(`descripcion`, `Campo DESCRIPCION vacio`).not().isEmpty()
], actualizarUnProducto)

router.put(`/habilitar/idProducto`, auth(`admin`),habilitarUnProducto)
router.put(`/deshabilitar/idProducto`, auth(`admin`),deshabilitarUnProducto)


router.post(`/agregarImagen/:idProducto`, multer.single(`imagen`), agregarImagenProducto)

router.post(`/agregarProdFav/:IdProducto`, auth(`usuario`),agregarProductosAlFavorito)

router.post(`/agregarProdCart/:IdProducto`, auth(`usuario`),agregarProductosAlCarrito)

router.delete(`/borrarProdFav/:IdProducto`, auth(`usuario`),borrarProductoDeFavoritos)

router.delete(`/borrarProdCart/:IdProducto`, auth(`usuario`),borrarProductoDeCarrito)
   
router.delete(`/:idProducto`, auth(`admin`), eliminarUnProducto)

module.exports = router