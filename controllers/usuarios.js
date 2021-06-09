//Controllers
const { response, json } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const emailer = require('../nodemailer/nodemailer');


//Buscar Usuario con paginacion de 5 en 5

const getUsuario = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
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

        //Enviar correo de Registro
        emailer.sendMail();

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

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

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

        if (!usuarioDB.google) {
            campos.email = email;
        } else if (usuarioDB.email !== email) {
            return res.status.json({
                ok: false,
                msg: 'Usuario de google no puede modificar su correo'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            mgs: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'error inesperado de actializar Usuario',
        })
    }

}

//Borar Uduario
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mgs: 'no se encuatra usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);

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