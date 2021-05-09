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
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Comercio', ComercioScehma);