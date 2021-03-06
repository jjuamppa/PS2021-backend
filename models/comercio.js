const { Schema, model } = require('mongoose');

const ComercioScehma = Schema({
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

ComercioScehma.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model('Comercio', ComercioScehma);