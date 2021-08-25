const { response } = require("express");
const comercio = require('../models/comercio');
const Comercio = require('../models/comercio');



// const getComercios = async(req, res = response) => {
//     const comercios = await Comercio.find({}, 'nombre email direccion telefono');

//     res.json({
//         ok: true,
//         comercios
//     });
// }


const getComercios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [comercios, total] = await Promise.all([
        Comercio
        .find({}, 'nombre email direccion telefono')
        .skip(desde)
        .limit(5),

        Comercio.countDocuments()
    ]);


    res.json({
        ok: true,
        comercios,
        total
    });

}

//Craer Comercio
const crearComercios = async(req, res = response) => {

    const { email, password } = req.body;

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


const actualizarComercios = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const comercio = await Comercio.findById(id);

        if (!comercio) {
            return res.status(404).json({
                ok: true,
                msg: 'Comercio no encontrado por id',
            });
        }

        const cambiosComercio = {
            ...req.body,
        }

        const comercioActualizado = await Comercio.findByIdAndUpdate(id, cambiosComercio, { new: true });

        res.json({
            ok: true,
            comercio: comercioActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const borrarComercios = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const comercioDB = await Comercio.findById(uid);

        if (!comercioDB) {
            return res.status(404).json({
                ok: false,
                mgs: 'no se encuatra comercio con ese id'
            });
        }
        await Comercio.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'comercio eliminado'
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
    getComercios,
    crearComercios,
    actualizarComercios,
    borrarComercios
}