// path 'api/todo/:busqueda'

const { Router } = require('express');
const router = Router();
const { GetTodo, getDocumentosColeccion } = require('../controllers/busquedas')
const { validarJWT } = require('../Middlewares/validar-jwt')

router.get('/:busqueda', validarJWT, GetTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);





module.exports = router;