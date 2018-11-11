const express = require('express')
const bodyParser = require('body-parser')

//Se instancia el servidor
const app = express()

//Funcion LISTEN para el server (consola)
app.get('/', (req, res) => {
    res.send('Online store API')
})

//Método GET para el browser
app.listen(3000, () => {
    console.log('Listening on port 3000')
})
