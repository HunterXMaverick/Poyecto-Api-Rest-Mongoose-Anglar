;
'use strict'

const Usuario = require('../modelos/UsuariosModel'),
    fs = require('fs'),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    { ObjectId } = require('mongodb')

///const connectDB = require('../config/db')

let prueba = (req, res) => {
    res.status(200).send('Zero')
}

//obtener todo
let getAll = async (req, res) => {
    Usuario.find()
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: `Todos los datos obtenidos ${data.length}`
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

//obtener id
let getById = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Usuario.find({ '_id': id })
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: `Id obtenido ${data.length}`
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

//obtener elemento
let getByElement = async (req, res) => {
    let campos = req.query.campo
    let elemento = req.query.elemento

    Usuario.find({ 'nombre': elemento })
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: `elementos obtenidos ${data.length}`
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

//insertar 1
let insertData = async (req, res) => {
    let data = req.body.data
    Usuario.create(data)
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: 'dato insertado..'
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

//instar varios
let insertDataMany = async (req, res) => {
    let arrayPersons = req.body.data
    Usuario.insertMany(arrayPersons)
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: 'datos insertados..'
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

//actualizar 1
let updateData = (req, res) => {
    let datas = req.body
    Usuario.updateOne({ '_id': new ObjectId(datas.id) }, datas.datosACambiar)
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: 'dato actualizado..'
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
    Usuario.updateMany({ "sexo": data.sexo }, { "$set": { "edad": data.edad, "direccion": "Quito" } })
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
        db.collection('usuarios').updateOne({}, { $set: { datas } })
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
    // let id = new ObjectId(req.query.id)
    // let data = req.body
    Usuario.deleteMany({})
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



let loginUsers = (req, res) => {
    let { data } = req.body,
        email = data.email,
        password = data.password;
    console.log(email)
    Usuario.find({ email: email })
        .then((data) => {
            console.log(data)
            bcrypt.compareSync(password, data[0].passw) ?
                ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, console.log(token), {
                    algorithm: "HS256",
                    expiresIn: 60000,
                })),
                    res.status(200).json({
                        transaccion: true,
                        data: data,
                        msg: "usuario OK",
                        token,
                    })) :
                res.status(404).json({
                    transaccion: false,
                    data: null,
                    msg: "password incorrecto",
                    token: null,
                });

        })
        .catch((err) => {
            res.status(404).json({
                transaccion: false,
                data: null,
                msg: "no se encotro el correo1",
            });
        });
};
module.exports = {
    prueba,
    getAll,
    insertDataMany,
    insertData,
    updateData,
    updateDataMany,
    getById,
    getByElement,
    deleteData,
    loginUsers
}