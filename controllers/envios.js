const { response } = require("express");
const Envio = require("../models/envio");


// Obtener envio
const getEnvios = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [envios, total] = await Promise.all([
        Envio
        .find({}, 'direccion email telefono fecha monto')
        .skip(desde)
        .limit(5),

        Envio.countDocuments()
    ]);


    res.json({
        ok: true,
        envios,
        total
    });

}

//Craer Envio
const crearEnvios = async(req, res = response) => {

    try {
        const envio = new Envio(req.body);

        //Grabar Envio
        await envio.save();

        res.json({
            ok: true,
            envio,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado... ver Logs'
        });
    }

}



const borrarEnvios = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const enviodDB = await Envio.findById(uid);

        if (!enviodDB) {
            return res.status(404).json({
                ok: false,
                mgs: 'no se encuatra solicitud con ese id'
            });
        }
        await Envio.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'solicitud eliminada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });

    }
}
module.exports = {
    getEnvios,
    crearEnvios,
    borrarEnvios
}