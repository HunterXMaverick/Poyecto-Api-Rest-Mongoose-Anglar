const jwt = require('jsonwebtoken'),

const curso = require('../../modelos/CursoModel')

let adminCurso = (req, res, next) => {
    let token = req.headers.authorization || null

    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            return res.status(400).json({
                data: err,
                msg: "Invalid token",
            });
        } else {
            curso.find({ id: decode.data.curso })
                .then((data) => {
                    if(data[0].nombre === 'curso principal') {
                        next();
                    } else {
                        res.status(401).json({
                            ok: false,
                            data: null,
                            msg: 'no tiene permiso',
                        });
                    }
                })
        }
    }).cath((err) =>{
        console.log('no encontrado')
    })

}