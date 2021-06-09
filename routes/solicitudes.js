const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../Middlewares/validar-campos');
const { getSolicitudes, crearSolicitudes, borrarSolicitudes } = require('../controllers/solicitudes');


const router = Router();

router.get('/', getSolicitudes);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('direccion', 'la dirreccion es obligatorio').not().isEmpty(),
    check('telefono', 'la telefono es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos,
], crearSolicitudes);

router.delete('/:id',
    borrarSolicitudes);

module.exports = router;