const { response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token'

        });
    }

    //Verificar Token

    try {

        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        req._id = _id;

        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token incorrecto'
        });

    }

}

module.exports = {
    validarJWT
}