const { response } = require("express");
const Solicitud = require("../models/solicitud");

const getSolicitudes = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [solicitudes, total] = await Promise.all([
        Solicitud
        .find({}, 'nombre email direccion telefono')
        .skip(desde)
        .limit(5),

        Solicitud.countDocuments()
    ]);


    res.json({
        ok: true,
        solicitudes,
        total
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

const actualizarSolicitudes = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const solicitud = await Solicitud.findById(id);

        if (!solicitud) {
            return res.status(404).json({
                ok: true,
                msg: 'Solicitud no encontrada por id',
            });
        }

        const cambiosSolicitud = {
            ...req.body,
        }

        const solicitudActualizada = await Solicitud.findByIdAndUpdate(id, cambiosSolicitud, { new: true });

        res.json({
            ok: true,
            solicitud: solicitudActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
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
    borrarSolicitudes,
    actualizarSolicitudes
}