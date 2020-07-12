;
'use strict'

const mongoose = require('mongoose'),
    { Schema } = mongoose,

    UsuarioModel = new Schema(
        {
            nombre: { type: String },
            apellido: { type: String },
            edad: { type: String },
            email: { type: String },
            foto: { type: String },
            password: { type: String },
            sessionID: { type: String },
            createAt: { type: Date },
            role: { type: String },
            tituloAcademico: { type: String },
        }
    );

module.exports = mongoose.model('Usuarios', UsuarioModel, 'Usuarios')
