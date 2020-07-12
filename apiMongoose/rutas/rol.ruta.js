const express = require("express")

let api = express.Router(),
    rolControl = require('../controles/rol.control')

    //users ENDPOINT
api.get('/rol', rolControl.obtener)
api.get("/role/:id", rolControl.obtenerID);

api.post("/rol", rolControl.enviar);

api.patch("/rol/:id",rolControl.patch);

api.delete("/rol/:id", rolControl.borrar);

module.exports = api