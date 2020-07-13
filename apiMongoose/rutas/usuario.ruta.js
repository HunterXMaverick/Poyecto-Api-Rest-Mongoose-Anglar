;
'use strict'
const express = require('express')

const passwordControl= require('../controles/middelwares/password'),
autenticaControl= require('../controles/middelwares/autentifica.control')

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control');


//prueba
api.get('/prueba', usuarioControl.prueba)
//obtener
api.get('/obtenerUsuario', usuarioControl.getAll)
api.get('/obtenerId', usuarioControl.getById)
api.get('/findElement', usuarioControl.getByElement)
//instar
api.post('/insertOne', passwordControl.codificarPassword ,usuarioControl.insertData)
api.post('/insertMany', usuarioControl.insertDataMany)
//actualizar
api.put('/updateOne', usuarioControl.updateData)
api.put('/updateMany', usuarioControl.updateDataMany)
//borrar
api.delete('/deleteElement', usuarioControl.deleteData)

//login
api.post('/loginUser', usuarioControl.loginUsers);


module.exports = api;