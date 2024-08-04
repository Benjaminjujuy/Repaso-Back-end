const express = require(`express`)
const { crearUsuario, traerTodosLosUsuarios, traerUnUsuario, actualizarUnUsuario, eliminarUnUsuario } = require("../controllers/usuarios.controllers")

const router = express.Router()

router.post(`/`, crearUsuario)
   
router.get(`/`, traerTodosLosUsuarios)
   
router.get(`/:idProducto`, traerUnUsuario)
   
router.put(`/:idProductos`, actualizarUnUsuario)
   
router.delete(`/:idProducto`, eliminarUnUsuario)

module.exports = router