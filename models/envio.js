const { Schema, model } = require('mongoose');

const EnvioScehma = Schema({
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
    fecha: {
        type: Date,
        required: true,
    },
    monto: {
        type: Number,
        required: true,
    },
})

EnvioScehma.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model('Envio', EnvioScehma);