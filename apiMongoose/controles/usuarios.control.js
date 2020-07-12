; 
'use strict'

const Usuario = require('../modelos/UsuariosModel'), 
    fs = require('fs'),
    { ObjectId } = require('mongodb');

let getAll = async (req, res) => {
    Usuario.find()
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getById = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Usuario.find({'_id': id})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getByElement = async (req, res) => {
    let campos = req.query.campo
    let elemento = req.query.elemento

    Usuario.find({'nombre': elemento})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let insertData = async (req, res) => {
    let data = req.body
    Usuario.create(data)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos guardados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let insertDataMany = async (req, res) => {
    let arrayPersons = req.body.data
    Usuario.insertMany(arrayPersons)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos guardados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateData = (req, res) => {
    let datas = req.body
    Usuario.updateOne({'_id': new ObjectId(datas.id) }, datas.datosACambiar)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateDataMany = async (req, res) => {
    let data = req.body
    Usuario.updateMany({"sexo": data.sexo},{"$set": {"edad": data.edad, "direccion": "Quito"}})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateDataManyTemporal = async (req, res) => {
    let db = await connectDB();
    let datas = req.body

    datas.forEach(element => {
        db.collection('usuarios').updateOne({},{$set: {datas}})
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: 'datos actualizados..'
            })
        })
        .catch(err => {
            res.status(500).json({
                transaction: false,
                data: null,
                msg: `El error es: ${err}`
            })
        })
    });
}


let deleteData = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Usuario.deleteOne({ '_id': id})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

module.exports = {
    getAll,
    insertDataMany,
    insertData,
    updateData,
    updateDataMany,
    getById,
    getByElement,
    deleteData
}