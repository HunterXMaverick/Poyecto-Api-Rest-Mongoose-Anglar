;
'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    connectDB = require('../config/db');
    passport = require('passport'),
    cors = require('cors'),
    parseurl = require('parseurl');

let app = express(),
    session = require('express-session'),
    cursoRuta = require('../rutas/curso.rutas'),
    usuarioRuta = require('../rutas/usuario.ruta'),
    fileRuta = require('../rutas/files.ruta'),
    rolRuta=require('../rutas/rol.ruta'),
    db = connectDB(),

    sess = {
        //SESSION CONFIG
        secret: process.env.KEY_SESSION,
        resave: false,
        saveUninitialized: true,
        name: "sessionID",
        cookie: {
            httpOnly: false,
            maxAge: parseInt(process.env.TIME),
        },
    },
    corsOptions = {
        origin: "http://localhost:4200",
        optionsSuccessStatus: 200,
    }


    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json())

//Cors configuration
app.use(cors(corsOptions));

//Session
app.use(session(sess));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Session examples to verificate
app.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = {};
    }
    let pathname = parseurl(req).pathname;
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    next();
});

app.get('/prueba1',  (req, res, next) => {
    res.send('vista prueba1' + req.session.views['/prueba1'] + 'time' + req.sessionID)
})

//Routes
app.use("/api", fileRuta);
app.use("/api", usuarioRuta);
app.use("/api", cursoRuta);
app.use("/api", rolRuta);

module.exports = app;
