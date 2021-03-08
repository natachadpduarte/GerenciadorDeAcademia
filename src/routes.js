const express = require('express') //configuração de rota. importando arquivo
const routes = express.Router()//metodo router, faz com que a variavel seja responsavel pelas rotas
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')

routes.get('/', function (req,res){
    return res.redirect("/instructors") /// está redirecionando para a instructors
})

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post("/instructors", instructors.post )
// HTTP VERBOS - REGRAS PARA SE COMUNICAR COM O PROTOCOLO HTTP UTILIZANDO OS VERBOS; resource pode ser algo do mundo real tipo intructor ou ate mesmo abstrato
// GET : Receber RESOURCE DEVOLVE ALGO
// POST : Criar um novo RESOURCE com dados enviados
// PUT : Atualizar RESOURCE
// DELETE : Deletar RESOURCE
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)



//members rotas

routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post("/members", members.post )
routes.put("/members", members.put)
routes.delete("/members", members.delete)

module.exports = routes//exportando arquivos