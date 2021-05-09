const { response } = require("express");
const comercio = require('../models/comercio');
const Comercio = require('../models/comercio');



const getComercios = async(req, res = response) => {
    const comercios = await Comercio.find({}, 'nombre email direccion telefono');

    res.json({
        ok: true,
        comercios
    });
}

//Craer Comercio
const crearComercios = async(req, res = response) => {

    const { email } = req.body;

    try {

        const existeEmail = await Comercio.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                mgs: 'el email ya esta registrado'
            });

        }

        const comercio = new Comercio(req.body);


        //Grabar Usuario
        await comercio.save();


        res.json({
            ok: true,
            comercio,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado... ver Logs'
        });
    }

}

const actualizarComercios = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarComercios'
    });
}
const borrarComercios = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarComercios'
    });
}

module.exports = {
    getComercios,
    crearComercios,
    actualizarComercios,
    borrarComercios
}