const { response } = require("express");
const Solicitud = require("../models/solicitud");

const getSolicitudes = async(req, res = response) => {
    const solicitudes = await Solicitud.find({}, 'nombre email direccion telefono');

    res.json({
        ok: true,
        solicitudes
    });
}

//Craer Solicitud
const crearSolicitudes = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Solicitud.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                mgs: 'el email ya esta registrado'
            });

        }

        const solicitud = new Solicitud(req.body);


        //Grabar Usuario
        await solicitud.save();


        res.json({
            ok: true,
            solicitud,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado... ver Logs'
        });
    }

}



const borrarSolicitudes = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const solicitudDB = await Solicitud.findById(uid);

        if (!solicitudDB) {
            return res.status(404).json({
                ok: false,
                mgs: 'no se encuatra solicitud con ese id'
            });
        }
        await Solicitud.findByIdAndDelete(uid);

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
    getSolicitudes,
    crearSolicitudes,
    borrarSolicitudes
}