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

//Lectura y parseo del Body
app.use(express.json());

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto' + process.env.PORT)
});