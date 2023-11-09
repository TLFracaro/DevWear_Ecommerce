import mysql2 from "mysql2/promise";

const con = await mysql2.createConnection({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PWD
})

await con.changeUser({ database: process.env.DB });
console.log('Conexão com BD realizada.')

export {con};