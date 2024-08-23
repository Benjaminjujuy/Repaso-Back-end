const express = require(`express`)
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto, agregarProductosAlFavorito, agregarProductosAlCarrito, borrarProductoDeFavoritos, borrarProductoDeCarrito, agregarImagenProducto } = require("../controllers/productos.controllers")
const { check } = require("express-validator")
const multer = require("../middlewares/multer")
const auth = require("../middlewares/auth")
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

router.post(`/agregarProdFav/:IdProducto`, auth(`usuario`),agregarProductosAlFavorito)

router.post(`/agregarProdCart/:IdProducto`, auth(`usuario`),agregarProductosAlCarrito)

router.delete(`/borrarProdFav/:IdProducto`, auth(`usuario`),borrarProductoDeFavoritos)

router.delete(`/borrarProdCart/:IdProducto`, auth(`usuario`),borrarProductoDeCarrito)
   
router.delete(`/:idProducto`, eliminarUnProducto)

module.exports = router