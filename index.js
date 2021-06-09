require('dotenv').config();
const { responde } = require('express')
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
var bodyParser = require('body-parser')



//Base de Datos
dbConnection();

//Crear el servidor
const app = express();

//Configurar Cors
app.use(cors());

//Lectura y parseo del Body
app.use(express.json());

//Direcictorio Publico
app.use(express.static('public'));

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Agrega credenciales
mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN
});


//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/comercios', require('./routes/comercios'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.post('/checkout', (req, res) => {
    // Crea un objeto de preferencia
    let preference = {
        items: [{
            title: req.body.title,
            unit_price: parseInt(req.body.price),
            quantity: 1,
        }]
    };

    mercadopago.preferences.create(preference)
        .then(function(response) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            res.redirect(response.body.sandbox_init_point);

            //global.id = response.body.id;
        }).catch(function(error) {
            console.log(error);
        });

});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto' + process.env.PORT)
});