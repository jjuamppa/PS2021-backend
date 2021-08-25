const { response } = require("express");
const Usuario = require('../models/usuario')
const Comercio = require('../models/comercio');
const Transaccion = require("../models/transaccion");
const Solicitud = require("../models/solicitud");



const GetTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [comercios, usuarios, transacciones, solicitudes] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Comercio.find({ nombre: regex }),
        Transaccion.find({ nombre: regex }),
        Solicitud.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        comercios,
        transacciones,
        solicitudes
    });
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'transacciones':
            data = await Transaccion.find({ nombre: regex })
            break;

        case 'comercios':
            data = await Comercio.find({ nombre: regex })
            break;

        case 'solicitudes':
            data = await Solicitud.find({ nombre: regex })
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/comercios/solicitudes/transacciones'
            });
    }

    res.json({
        ok: true,
        resultados: data
    })
}
module.exports = {
    GetTodo,
    getDocumentosColeccion
}