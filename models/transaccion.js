const { Schema, model } = require('mongoose');

const TransaccionScehma = Schema({
    fecha: {
        type: Date,
        required: true,
    },
    monto: {
        type: Number,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },

});

TransaccionScehma.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Transaccion', TransaccionScehma);