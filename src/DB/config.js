const mongoose = require(`mongoose`)

mongoose.connect(process.env.MONGO_CONNECT)
.then(() => console.log(`Base de datos conectada`))
.catch((error) => console.log(`Error en la conexion de la BD`, error))