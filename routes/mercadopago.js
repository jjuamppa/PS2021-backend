// // Crea un objeto de preferencia
// const { Router } = require('express');
// const router = Router();
// const { responde } = require('express')



// // SDK de Mercado Pago
// const mercadopago = require('mercadopago');

// // parse application/x-www-form-urlencoded
// // app.use(bodyParser.urlencoded({ extended: false }))

// // Agrega credenciales
// mercadopago.configure({
//     access_token: process.env.PROD_ACCESS_TOKEN
// });


// const preference = {
//     items: [{
//         title: 'Mi producto',
//         unit_price: 100,
//         quantity: 1,
//     }]
// };

// mercadopago.preferences.create(preference)
//     .then(function(response) {

//         res.redirect(response.body.sandbox_init_point);

//         // Este valor reemplazará el string "<%= global.id %>" en tu HTML
//         //global.id = response.body.id;
//     }).catch(function(error) {
//         console.log(error);
//     });


// module.exports = router;