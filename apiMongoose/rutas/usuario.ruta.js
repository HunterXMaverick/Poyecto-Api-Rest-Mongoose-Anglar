;
'use strict'
const express = require('express');

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control');

api.get('/getUser', usuarioControl.getAll)
api.post('/insertMany', usuarioControl.insertDataMany)
api.post('/insertOne', usuarioControl.insertData)
api.put('/updateOne', usuarioControl.updateData)
api.put('/updateMany', usuarioControl.updateDataMany)
api.get('/findOne', usuarioControl.getById)
api.get('/findElement', usuarioControl.getByElement)
api.delete('/deleteElement', usuarioControl.deleteData)

module.exports = api;