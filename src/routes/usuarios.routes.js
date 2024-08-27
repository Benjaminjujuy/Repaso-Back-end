const express = require(`express`)
const { crearUsuario, traerTodosLosUsuarios, traerUnUsuario, actualizarUnUsuario, eliminarUnUsuario, iniciarSesion } = require("../controllers/usuarios.controllers")
const { check } = require("express-validator")
const auth = require("../middlewares/auth")

const router = express.Router()

router.post(`/`,[
    check(`nombreUsuario`, `campo NOMBREUSUARIO esta vacio`).not().isEmpty(),
    check(`nombreUsuario`, `Minimo de 5 caracteres`).isLength({min: 5}),
    check(`contrasenia`, `Campo CONTRASENIA vacio`).not().isEmpty(),
    check(`contrasenia`, `min 8 y max 40`).isLength({min:8, max:40})
], crearUsuario)

router.post(`/login`,[
    check(`nombreUsuario`, `campo NOMBREUSUARIO esta vacio`).not().isEmpty(),
    check(`nombreUsuario`, `Minimo de 5 caracteres`).isLength({min: 5}),
    check(`contrasenia`, `Campo CONTRASENIA vacio`).not().isEmpty(),
    check(`contrasenia`, `min 8 y max 40`).isLength({min:8, max:40})
], iniciarSesion)
   
router.get(`/`, auth(`admin`), traerTodosLosUsuarios)
   
router.get(`/:idUsuario`, traerUnUsuario)
   
router.put(`/:idUsuario`, actualizarUnUsuario)
   
router.delete(`/:idUsuario`, eliminarUnUsuario)

module.exports = router