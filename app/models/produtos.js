/**
 * 
 * Arquivo: produto.js
 * Descrição: Arquivo responsavel onde trataremos o modelo da classe 'Produto'
 * Author:Ricardo seguindo curso Udemy/Glaucia86
 * Data de Criação: 10/08/2018
 * 
 */

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var ProdutoSchema = new Schema({
     nome: String,
     preco: Number,
     descricao: String
 });

 module.exports = mongoose.model('Produto', ProdutoSchema);
