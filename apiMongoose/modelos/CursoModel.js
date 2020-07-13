const mongoose = require('mongoose')
const { model } = require('./Files')

const { Schema } = mongoose

const CursoModel = Schema({
    titulo: { type: String },
    profesor: { type: String },
    description: { type: String },
    tema: { type: String },
    participantes: { type: Array },
    sessionID: { type: String },
    createAt: { type: Date },
})

module.exports = mongoose.model('Cursos', CursoModel)