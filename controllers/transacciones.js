const { response } = require('express');
const Transaccion = require('../models/transaccion');


const getTransacciones = async(req, res = response) => {

    // const transacciones = await Transaccion.find({}, 'usuario fecha monto');

    const transacciones = await Transaccion.find()
        .populate('usuario', 'fecha monto')


    res.json({
        ok: true,
        transacciones
    });
}

const crearTransacciones = async(req, res = response) => {
    // extarer el usuario
    const uid = req.uid;
    const transacciones = new Transaccion({
        usuario: uid,
        ...req.body
    });

    try {
        const transacionDB = await transacciones.save();

        res.json({
            ok: true,
            transaccion: transacionDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admi'
        });
    }

    const actualizarTransacciones = (req, res = response) => {
        res.json({
            ok: true,
            msg: 'actualizarTransacciones'
        })
    }

    const borrarTransacciones = async(req, res = response) => {
        const id = req.params.id;

        try {

            const transaccion = await Transaccion.findById(id);

            if (!transaccion) {
                return res.status(404).json({
                    ok: true,
                    msg: 'Transaccion no encontrada por id',
                });
            }

            await Transaccion.findByIdAndDelete(id);

            res.json({
                ok: true,
                msg: 'Transaccion eliminada'
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    }
}

const obetenerPromMensual = async(req, res = response) => {
    // extarer el usuario
    console.log(req.query.fecha);

    var params = req.query.fecha;


    const fecha = params;
    // console.log(params);
    console.log('esta es la fecha', params);

    const transacciones = await Transaccion.find({
        fecha: fecha,
    });
    console.log(transacciones);
    res.json({
        ok: true,
        transaccion: transacciones
    });

}

const obetenerVentaDia = async(req, res = response) => {
    // extarer el usuario
    console.log(req.query.fecha);
    var params = req.query.fecha;

    const fecha = params;
    // console.log(params);
    console.log('esta es la fecha', params);

    const transacciones = await Transaccion.find({
        fecha: fecha,
    });
    console.log(transacciones);
    res.json({
        ok: true,
        transaccion: transacciones
    });

}



module.exports = {
    getTransacciones,
    crearTransacciones,
    obetenerPromMensual,
    obetenerVentaDia
}