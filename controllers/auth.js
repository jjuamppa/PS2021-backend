const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const emailer = require('../nodemailer/nodemailer');



const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'el email no es valido'
            });
        }

        //Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'la contraseña no es valida'
            });
        }

        //Generar TOKEN (JWT)
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });

    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;
    try {

        const { email, name, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        //Si el usuario no existe
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //si el usuario si existe
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Grabar en base de datos
        await usuario.save();

        //Generar TOKEN (JWT)
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'token de google',
            token
        });

        //Enviar correo de Registro
        emailer.sendMail();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'token no es valido'
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //Generar TOKEN (JWT)
    const token = await generarJWT(uid);

    //Obeter el usuario po ID
    const usuario = await Usuario.findById(uid);


    res.json({
        ok: true,
        token,
        usuario

    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}