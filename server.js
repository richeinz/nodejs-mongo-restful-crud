/**
 * 
 * Arquivo: server.js
 * Descrição: 
 * Author:Ricardo seguindo curso Udemy/Glaucia86
 * Data de Criação: 10/08/2018
 * 
 */

// Configurar o Setup da App:
//chamadas dos pacotes:
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Produto = require('./app/models/produto');

//URI: MLab
mongoose.connect('mongodb://<richeinzmlab>:<mlab123456>@ds020208.mlab.com:20208/node-crud-api', {
    useMongoClient:true
});

//Configuração da variável app para usar p 'bodyParser(':)
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Definando a porta onde será usada a app:
var port = process.env.port || 8000;

//Criando uma instância das Rotas via Express:
var router = express.Router();

// Rotas da nossa Api:
//======================================
var router = express.Router();


router.use(function(req,res,next){
    console.log('Está acontecendo alguma coisa aqui....');
    next();
});

//Rota de exemplo
router.get('/', function(req, res){
    res.json({ message: 'Beleza! Bem vindo...funcionando às 17:28'})
});

//Definando um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);