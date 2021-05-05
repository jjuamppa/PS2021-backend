//Controllers
const { response, json } = require('express');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

//Buscar Usuario
const getUsuario = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

//Craer Usuario
const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                mgs: 'el email ya esta registrado'
            });

        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Grabar Usuario
        await usuario.save();

        //Generar TOKEN (JWT)
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error inesperado... ver Logs'
        });
    }

}

//Actializar Usuario
const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto

    const _id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(_id);

        //comprobar si el usuario existe
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mgs: 'no se encuatra usuario con ese id'
            });
        }
        //Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    mgs: 'ya existe un usuario con ese emanil'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(_id, campos, { new: true });
        res.json({
            ok: true,
            mgs: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'error inesperado'
        });
    }

}

//Borar Uduario
const borrarUsuario = async(req, res = response) => {

    const _id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(_id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mgs: 'no se encuatra usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'usuario eliminado'
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
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}