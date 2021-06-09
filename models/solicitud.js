const { Schema, model } = require('mongoose');

const SolicitudScehma = Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
})

SolicitudScehma.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model('Solicitud', SolicitudScehma);