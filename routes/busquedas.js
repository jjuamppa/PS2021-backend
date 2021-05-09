// path 'api/todo/:busqueda'

const { Router } = require('express');
const router = Router();
const { GetTodo } = require('../controllers/busquedas')
const { validarJWT } = require('../Middlewares/validar-jwt')

router.get('/:busqueda', validarJWT, GetTodo);





module.exports = router;