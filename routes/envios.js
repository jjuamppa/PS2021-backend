const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../Middlewares/validar-campos');
const { getEnvios, crearEnvios, borrarEnvios } = require('../controllers/envios');


const router = Router();

router.get('/', getEnvios);

router.post('/', [
    check('direccion', 'la dirreccion es obligatorio').not().isEmpty(),
    check('telefono', 'la telefono es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('fecha', 'la fecha es obligatoria').not().isEmpty(),
    check('monto', 'el monto es obligatorio').not().isEmpty(),
    validarCampos,
], crearEnvios);

router.delete('/:id',
    borrarEnvios);

module.exports = router;