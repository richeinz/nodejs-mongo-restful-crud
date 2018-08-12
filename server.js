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
var Produto = require('./app/models/produtos');

mongoose.Promise = global.Promise;

//URI: MLab
mongoose.connect('mongodb://richeinzmlab:mlab123456@ds020208.mlab.com:20208/node-crud-api', {
    useMongoClient: true
});

//Configuração da variável app para usar p 'bodyParser(':)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definando a porta onde será usada a app:
var port = process.env.port || 8000;

//Criando uma instância das Rotas via Express:
var router = express.Router();

//Middleware para usar em todos os requests enviados para a nossa API - Mensagem Padrão:
router.use(function (req, res, next) {
    console.log('Está acontecendo alguma coisa aqui....');
    next();
});

//Rota de teste para sabermos se tudo está funcionando (acessar através: GET: http://localhost:8000/api )
router.get('/', function (req, res) {
    var hora = new Date();
    res.json({ message: 'Beleza! Bem vindo...funcionando às ' + hora })
});

//API's
//==================================================================================================================

//Rotas que terminarem com '/produtos' serve para GET ALL & POST
router.route('/produtos')

    /*  1) Método: Criar Produto (acessar em: POST http://localhost:8000/api/produtos)  */
    .post(function (req, res) {
        var produto = new Produto();

        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(function (error) {
            if (error)
                res.send('Erro ao salvar o Produto....: ' + error);

            res.json({ message: 'Produto salva com sucesso!' });
        })
    })

    /*  2) Método: Selecionar todos os Produtos cadastrados (acessar em: GET http://localhost:8000/api/produtos)  */
    .get(function (req, res) {
        Produto.find(function (error, produtos) {
            if (error)
                res.status(400).send('Erro ao selecionar os todos os produtos ' + error);

            res.status(200).json(produtos);
        });
    });

//Rotas que terminarem com '/produtos/:produto_id' serve para GET, PUT & DELETE
router.route('/produtos/:produto_id')

    /*  3) Método: Selecionar por Id (acessar em: GET http://localhost:8000/api/produtos/:produto_id)  */
    .get(function (req, res) {
        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error)
                res.status(400).send('Id do produto não encontrado... ' + error)

            res.status(200).json(produto);
        });
    })

    /*  4) Método: Atualiza por Id (acessar em: PUT http://localhost:8000/api/produtos/:produto_id)  */
    .put(function (req, res) {
        //primeiro buscamos o Id do Produto
        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error)
                res.status(400).send('Id do produto não encontrado... ' + error);
            //segundo altera-se os valores atribuídos
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;

            //terceiro vamos salvar as atualizações
            produto.save(function (error) {
                if (error)
                    res.status(400).send('Erro ao atualizar o produto... ' + error);

                res.status(200).json({ message: 'Produto atualizado com sucesso' });
            });


        })
    })

    /*  5) Método: Excluir um produto por Id (acessar em: DELETE http://localhost:8000/api/produtos/:produto_id)  */
    .delete(function (req, res) {
        Produto.remove({
            _id: req.params.produto_id
        }, function (error) {
            if (error)
                res.status(400).send('Erro ao escluir o produto... ' + error);

            res.status(200).json({ message: 'Produto excluído com sucesso' });
        });
    });





//Definando um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);