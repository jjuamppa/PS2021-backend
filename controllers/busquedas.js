const { response } = require("express");
const Usuario = require('../models/usuario')
const Comercio = require('../models/comercio')



const GetTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [comercios, usuarios] = await Promise.all([
        await Usuario.find({ nombre: regex }),
        await Comercio.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        comercios
    });
}
module.exports = {
    GetTodo
}