const { age, date } = require('../../lib/utils') // desestruturando age e date do utils
const Instructor = require('../models/Instructor')
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
           callback(instructors) {

            
            const pagination = {
                total: Math.ceil(instructors[0].total / limit),
                page
            }
            return res.render("instructors/index", { instructors, pagination, filter })
           }
       }

       Instructor.paginate(params)
    },

    create(req, res){
        return res.render("instructors/create")
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
         Instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
         })
         
    }
    ,

    show(req, res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },

    edit(req, res){

        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found")

            instructor.birth = date(instructor.birth).iso
            return res.render("instructors/edit", { instructor })
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

      Instructor.update(req.body, function() {
          return res.redirect(`/instructors/${req.body.id}`)
      })
    
},

    delete(req, res){

        Instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        
        })
    },
}


