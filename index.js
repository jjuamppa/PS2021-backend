require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Base de Datos
dbConnection();

//Crear el servidor
const app = express();

//Configurar Cors
app.use(cors());

//rutas
app.get('/', (req, resp) => {

    resp.json({
        ok: true,
        msg: 'hola mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto' + process.env.PORT)
});