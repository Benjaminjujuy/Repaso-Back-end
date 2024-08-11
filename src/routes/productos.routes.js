const express = require(`express`)
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto } = require("../controllers/productos.controllers")
const { check } = require("express-validator")
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
   
router.delete(`/:idProducto`, eliminarUnProducto)

module.exports = router