const { response } = require('express');
const Transaccion = require('../models/transaccion');
const Usuario = require('../models/usuario');


const getTransacciones = async(req, res = response) => {

    // const transacciones = await Transaccion.find({}, 'usuario fecha monto');

    const transacciones = await Transaccion.find()
        .populate('usuario', 'nombre fecha monto')


    res.json({
        ok: true,
        transacciones
    });
}

const getTransaccionesxId = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const transacciones = await Transaccion.find({ 'usuario': uid });
        console.log(uid);
        if (!transacciones) {
            return res.status(404).json({
                ok: true,
                msg: 'Transaccion no encontrada por id',
            });

        }
        // await Transaccion.find({}, 'nombre fecha monto');
        // await Transaccion.find()
        //    .populate('usuario', 'nombre fecha monto')

        res.json({
            ok: true,
            transacciones
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
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



// const obetenerPromMensual = async(req, res = response) => {
//     // extarer el usuario
//     console.log(req.query.fecha);
//     var params = req.query.fecha;

//     const fecha = params;
//     // console.log(params);
//     console.log('esta es la fecha', params);

//     const transacciones = await Transaccion.find({
//         fecha: fecha,
//     });
//     console.log(transacciones);
//     res.json({
//         ok: true,
//         transaccion: transacciones
//     });

// }

const obetenerVentaxDia = async(req, res = response) => {
    // extarer el usuario
    // console.log(req.query.fecha);
    var params = req.query.fecha;

    const fecha = params;
    // console.log(params);
    // console.log('esta es la fecha', params);

    let transacciones = await Transaccion.find({
        fecha: { $gte: new Date(params) },
    });
    console.log(transacciones);

    let vta_dia = 0;

    transacciones.forEach(transaccion => {
        vta_dia = vta_dia + transaccion.monto;
    });

    res.json({
        ok: true,
        vta_dia: vta_dia
    });

}


const obetenerVentaxMes = async(req, res = response) => {

    // console.log(req.query.fecha);
    var params = req.query.fecha;

    const fechaInicial = '2021/07/01';
    const fechaFinal = '2021/07/31';

    let transacciones = await Transaccion.find({
        $and: [{ fecha: { $gte: new Date(fechaInicial) } }, { fecha: { $lt: new Date(fechaFinal) } }]
    });


    // console.log('transacciones mes');
    // console.log(transacciones);

    let vta_mes = 0;

    transacciones.forEach(transaccion => {
        vta_mes = vta_mes + transaccion.monto;
    });



    res.json({
        ok: true,
        vta_mes: vta_mes
    });


}


module.exports = {
    getTransacciones,
    crearTransacciones,
    obetenerVentaxDia,
    obetenerVentaxMes,
    getTransaccionesxId

}