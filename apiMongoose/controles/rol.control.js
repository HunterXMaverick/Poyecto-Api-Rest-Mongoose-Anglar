const rol = require('../modelos/RolModel')

let obtener = (req, res) => {
    rol.find()
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: 'obtenido',
                token: req.token,
            })
        }).catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: err,
            })
        })
}

let obtenerID = (req, res) => {
    let { id } = req.params

    rol.find({ id })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: 'obtenido id',
                token: req.token,
            })
        }).catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: err,
            })
        })
}

let enviar = (req, res) => {
    let { data } = req.body

    rol.create(data)
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: 'creado',
                token: req.token
            })
        }).catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: 'no fue creado'
            })
        })
}

let patch = (req, res) => {
    let { id } = req.params,
        { data } = req.body

        rol.updateOne({ id }, { $set: data })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: 'listo',
                token: req.token
            })
        }).catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: err
            })
        })
}

let borrar = (req, res) => {
    let { id } = req.params

    rol.deleteOne({ id })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: 'borrado',
                token: req.token
            })
        }).catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: err
            })
        })
}

module.exports = {
    obtener,
    obtenerID,
    enviar,
    patch,
    borrar
}