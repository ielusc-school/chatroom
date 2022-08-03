// parametrizando nossas libs
const express = require('express');
const consign = require('consign');
const expressValidator = require('express-validator');

// inicializando o express
const app = express();

// configurando assets e public do projeto
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//autoload routes, controllers, models for objects app 
consign()
.include('app/routes')
.then('app/models')
.then('app/controllers')
.into(app)

module.exports = app;

