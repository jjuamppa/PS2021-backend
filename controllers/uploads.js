const path = require('path')
const fs = require('fs')


const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen')



const fileUpload = (req, res = response) => {


    const tipo = req.params.tipo;
    const id = req.params.id;


    // Validar Tipo
    const tiposValidos = ['usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es un usuario (tipo)'
        });
    }


    // Validamos que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    //Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];


    // Validar extension
    const extensionValida = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es una extension permitida'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`;

    //Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen a la carpeta correspondiente 
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            });
        }
        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });
    })

    //Actializar Basa de datos
    actualizarImagen(tipo, id, nombreArchivo);

}

//Hcaer que se vea la imagen
const retornarImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);


    //Imagen po defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.png`);
        res.sendFile(pathImg);

    }


}


module.exports = {
    fileUpload,
    retornarImagen,
}