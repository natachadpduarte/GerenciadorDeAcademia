const { Pool } = require("pg") //desestruturando objeto. Tida vez que faço uma query preciso enviar login e senha e com o pool não.

module.exports = new Pool ({
    user: 'postgres',
    password:"postgres",
    host:"localhost",
    port:5432,
    database: "gymmanager"
})