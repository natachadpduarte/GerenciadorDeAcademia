const { age, date } = require('../../lib/utils') // desestruturando age e date do utils

const Member = require('../models/Member')

module.exports = { 
    index(req, res){
        
        let { filter, page, limit } = req.query

       page = page || 1
       limit = limit || 2
       let offset = limit * (page - 1)


       const params = {
           filter,
           page,
           limit,
           offset,
           callback(members) {

            const pagination = {
                total: Math.ceil(members[0].total / limit),
                page
            }
            return res.render("members/index", { members, pagination, filter })
           }
       }

       Member.paginate(params)
    },
    create(req, res){

        Member.instructorsSelectOptions(function(options) {
            return res.render('members/create', { instructorOptions: options})

        })
       
    },
    post(req, res){
       
            //req.body pega os dados passados pelo form abaixo... estou usando post
            //{"avatar_url":"http://www.natachaduarte.siteprofissional.com","name":"Naty","birth":"2020-07-02","gender":"F","services":"Natação"}
        
        
            //["avatar_url","name","birth","gender","services"]
            const keys = Object.keys (req.body) //contructor, é uma funcção que cria um objeto. sendo um objeto tenhp varias funcionalidade para aplicar no objeto.
            //validação dos dados
            for( key of keys) {
                //req.body , nesse caso é igual aplicar a propriedade req.body.avatar_url
                //req.body.key== ""
                // validação em todos os campos para nao passar como vazio.
                if (req.body[key] == "") {
                 return res.send("Please, fill all fields")//se eu tenho apenas uma linha de if, nao tem necessidade de colocar chaves.
            }
        }
         Member.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`)
         })
         
    }
    ,

    show(req, res){
        Member.find(req.params.id, function(member){
            if(!member) return res.send("Member not found")

            member.birth = date(member.birth).birthDay

            return res.render("members/show", { member })
        })
    },

    edit(req, res){

        Member.find(req.params.id, function(member){
            if(!member) return res.send("Member not found")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options) {
                return res.render('members/edit', { member, instructorOptions: options})

        })
    })
}
    ,

    put(req, res){
        const keys = Object.keys (req.body) 
        for( key of keys) {
            if (req.body[key] == "") {
             return res.send("Please, fill all fields")
        }
      }

      Member.update(req.body, function() {
          return res.redirect(`/members/${req.body.id}`)
      })
    
},

    delete(req, res){

        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        
        })
    },
}


