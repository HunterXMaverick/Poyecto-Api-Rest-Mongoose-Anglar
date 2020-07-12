const express = require('express');
const { model } = require('../modelos/Files');

let api = express.Router(),
cursoControl = require('../controles/curso.control')
//athentiControl = require('../controles')

//endPoints

api.get('/curso', cursoControl.obtener)
api.get('/', cursoControl.obtenerID)

api.post("/curso", cursoControl.enviar);

api.patch("/course/:_id", cursoControl.patch);

api.delete("/course/:_id", cursoControl.borrar);

module.exports = api