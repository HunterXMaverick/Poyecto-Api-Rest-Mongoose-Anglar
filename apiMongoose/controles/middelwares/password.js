;
'use strict'
const bcrypt = require('bcrypt')

let codificarPassword = (req, res, next) => {
    let {data} = req.body || null
    console.log(data)
    if (!data || data.passw == '' || !data.passw) {
        return res.status(200).send('usuario o password invaldios')
    } else {
        let codificarPassword = bcrypt.hashSync(data.passw, bcrypt.genSaltSync(10))
        req.body.data.passw = codificarPassword
        req.body.createAt= new Date()
        req.body.data.sessionID = req.sessionID

        next()
    }
}

module.exports = {
    codificarPassword
}
