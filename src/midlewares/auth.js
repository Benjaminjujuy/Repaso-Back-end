const jwt = require(`jsonwebtoken`)

module.exports = (rol) => (req, res, next) => {
    try {
        const token = req.header(`auth`)

        if(!token){
            return res.status(401).json({msg: `No estas autorizado`})
        }

        const verificarToken = jwt.verify(token, process.env.JWT_SECRET)

        if(verificarToken.rol === rol){
            next()
        }else{
            return res.status(403).json({msg: `No tienes permiso`})
        }
    } catch (error) {
        console.log(error)
    }
}