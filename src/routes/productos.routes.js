const express = require(`express`)
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto, agregarProductosAlFavorito, agregarProductosAlCarrito, borrarProductoDeFavoritos, borrarProductoDeCarrito } = require("../controllers/productos.controllers")
const { check } = require("express-validator")
const multer = require("multer")
const router = express.Router()


router.post(`/`,[
    check(`nombre`, `campo NOMBRE esta vacio`).not().isEmpty(),
    check(`precio`, `campo PRECIO vacio`).isLength({min: 5}),
    check(`descripcion`, `Campo DESCRIPCION vacio`).not().isEmpty()
], crearProducto)
   
router.get(`/`, traerTodosLosProductos)
   
router.get(`/:idProducto`, traerUnProducto)
   
router.put(`/:idProductos`,[
    check(`nombre`, `campo NOMBRE esta vacio`).not().isEmpty(),
    check(`precio`, `campo PRECIO vacio`).isLength({min: 5}),
    check(`descripcion`, `Campo DESCRIPCION vacio`).not().isEmpty()
], actualizarUnProducto)

router.post(`/agregarImagen/:idProducto`, multer.single(`imagen`), agregarImagenProducto)

router.post(`/agregarProdFav/:IdProducto`, agregarProductosAlFavorito)

router.post(`/agregarProdCart/:IdProducto`, agregarProductosAlCarrito)

router.delete(`/borrarProdFav/:IdProducto`, borrarProductoDeFavoritos)

router.delete(`/borrarProdCart/:IdProducto`, borrarProductoDeCarrito)
   
router.delete(`/:idProducto`, eliminarUnProducto)

module.exports = router