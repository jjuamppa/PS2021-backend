//ruta: /api/usuarios 

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../Middlewares/validar-campos');

const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../Middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuario);

router.post('/', [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'la cosntraseña es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario);

router.put('/:id', [
        validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('role', 'el role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario);

router.delete('/:id',
    validarJWT,
    borrarUsuario);


module.exports = router;