//Iniciando um servidor com express
const express = require('express') //chamando dependencia express, para iniciar o servidor
//Criando nosso servidor todo
const nunjucks = require('nunjucks') //chamando nunjucks, template engine
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express() //chamando a função express, antes armazenada na váriavel express

//será responsavel por enviar o req body do routes. configurando express para ler os dados enviados pelo body.
server.use(express.urlencoded({extended: true}))

//public serve nosso style, nosso script
server.use(express.static('public'))//observa pasta publica para servir os arquivos estaticos. Encontrar estilização na pasta public
//criando as nossas rotas
server.use(methodOverride('_method'))//sobrescreve o metodo que estou usando, no caso o post pelo put; precisa ser antes de ser direiconado para a rota , para poder sobrescrever
server.use(routes)//use é chamado middle. intercepta o ponto a ao ponto b, está no meio do caminho
server.set("view engine", "njk") //configurando nunjucks para ler html na pasta views (no momento ele está lendo arquivos njk). Faz reuso de codigo e outras coisas.


//fazendo a configuração da view engie
nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
}) //configurando onde nunjucks será usado


//colocando servidor online
server.listen(5000, function() {
    console.log("server is running")
}) //iniciando servidor na porta 5000