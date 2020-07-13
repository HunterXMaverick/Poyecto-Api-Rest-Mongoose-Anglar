;
'use strict'

const mongoose = require('mongoose'),
    { Schema } = mongoose

const UsuarioModel = new Schema(
    {
        nombre: { type: String },
        apellido: { type: String },
        edad: { type: String },
        email: { type: String },
        foto: { type: String },
        passw: { type: String },
        sessionID: { type: String },
        createAt: { type: Date },
        role: { type: String },
        tituloAcademico: { type: String },
    }
);

module.exports = mongoose.model('Usuarios', UsuarioModel)
