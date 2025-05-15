import{ Client } from 'pg'

const pgDatabase=new Client({
    host:'localhost',
    port:5433,
    user:'postgres',
    password:'root',
    database:'taller_adoniss'
})

pgDatabase.connect()
export default pgDatabase;