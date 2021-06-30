// // Crea un objeto de preferencia
const { Router } = require('express');
const router = Router();
const { responde } = require('express')

const mercadopago = require('mercadopago');

router.post('/', (req, res) => {
    // Crea un objeto de preferencia
    let preference = {
        items: [{
            title: req.body.title,
            unit_price: parseInt(req.body.price),
            quantity: 1,
        }],
        back_urls: {
            success: "http://localhost:4200/detalle",
            failure: "http://localhost:4200/failure ",
            pending: "http://localhost:4200/pending ",
        },
        auto_return: "all",
        //notification_url: "http://localhost:4200/detalle",
    };

    mercadopago.preferences.create(preference)
        .then(function(response) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            console.log(response.items);
            res.redirect(response.body.sandbox_init_point);

            //global.id = response.body.id;
        }).catch(function(error) {
            console.log(error);
        });


});

router.get('/', function(request, response) {
    response.json({
        Payment: request.query.payment_id,
        Status: request.query.status,
        MerchantOrder: request.query.merchant_order_id
    });
});

module.exports = router;