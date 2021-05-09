// path '/api/comercios'

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../Middlewares/validar-campos');
const { getComercios, crearComercios, actualizarComercios, borrarComercios } = require('../controllers/comercios');

const { validarJWT } = require('../Middlewares/validar-jwt');

const router = Router();

router.get('/', getComercios);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('direccion', 'la dirreccion es obligatorio').not().isEmpty(),
    check('telefono', 'la telefono es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos,

], crearComercios);

router.put('/:id', [],
    actualizarComercios);

router.delete('/:id',
    borrarComercios);


module.exports = router;