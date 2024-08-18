require(`dotenv`).config()
require(`./DB/config`)
const express = require(`express`)
const app = express()
const cors = require(`cors`)
const morgan = require(`morgan`)


app.use(express.json())
app.use(cors())
app.use(morgan(`dev`))

app.use(`/api`, require(`./routes/index.routes`))

app.listen(3001, () => {
    console.log(`Servidor funcionando en el puerto`, 3001)
})