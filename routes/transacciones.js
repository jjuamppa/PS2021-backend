// path '/api/transacciones'

const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../Middlewares/validar-campos');

const { validarJWT } = require('../Middlewares/validar-jwt');
const { getTransacciones, crearTransacciones, obetenerPromMensual } = require('../controllers/transacciones');

const router = Router();

router.get('/', getTransacciones);
router.get('/transaccionesMes', obetenerPromMensual);

router.post('/', [validarJWT,
    check('fecha', 'la fecha es obligatoria').not().isEmpty(),
    check('monto', 'el monto es obligatorio').not().isEmpty(),
    validarCampos,

], crearTransacciones);

// router.put('/:id', [],
//     actualizarTransacciones);

// router.delete('/:id',
//     borrarTransacciones);

module.exports = router;