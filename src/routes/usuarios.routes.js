const express = require(`express`)
const { crearUsuario, traerTodosLosUsuarios, traerUnUsuario, actualizarUnUsuario, eliminarUnUsuario, iniciarSesion } = require("../controllers/usuarios.controllers")
const { inicioSesionUsuario } = require("../services/usuarios.services")
const { check } = require("express-validator")
const auth = require("../midlewares/auth")

const router = express.Router()

router.post(`/`,[
    check(`nombreUsuario`, `campo NOMBREUSUARIO esta vacio`).not().isEmpty(),
    check(`nombreUsuario`, `Minimo de 5 caracteres`).isLength({min: 5}),
    check(`contrasenia`, `Campo CONTRASENIA vacio`).not().isEmpty(),
    check(`contrasenia`, `min 8 y max 40`).isLength({min:8, max:40})
], crearUsuario)

router.post(`/:idUsuario`,[
    check(`nombreUsuario`, `campo NOMBREUSUARIO esta vacio`).not().isEmpty(),
    check(`nombreUsuario`, `Minimo de 5 caracteres`).isLength({min: 5}),
    check(`contrasenia`, `Campo CONTRASENIA vacio`).not().isEmpty(),
    check(`contrasenia`, `min 8 y max 40`).isLength({min:8, max:40})
], inicioSesionUsuario)
   
router.get(`/`,auth(`usuario`), traerTodosLosUsuarios)
   
router.get(`/:idUsuario`, traerUnUsuario)
   
router.put(`/:idUsuario`, actualizarUnUsuario)
   
router.delete(`/:idUsuario`, eliminarUnUsuario)

module.exports = router