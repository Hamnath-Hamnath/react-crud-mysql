const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mySQL = require('mysql2');

const db = mySQL.createPool({
    host : 'localhost',
    user : 'root',
    // password : '',
    database : 'crud_contact'
})

app.use(cors())
app.use(express.json())
app.use(
    bodyParser.urlencoded({
        extended : true
    })
)

app.get('/api/get',(req,res)=>{
    const sqlGet = 'SELECT * FROM contact_db'
    db.query(sqlGet,(err,result)=>{
        res.send(result);
    })
})

//Post req

app.post('/api/post',(req,res)=>{
    const {name, email, contact} = req.body;
    const sqlINSERT = 'INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)';

    db.query(sqlINSERT,[name,email,contact], (error,result)=>{
        if(error)
            console.log(error)
    })
})

app.post('/api/remove/:id',(req,res)=>{
    const {id} = req.params;
    const sqlREMOVE = 'DELETE FROM contact_db WHERE id = ?';
    db.query(sqlREMOVE, id, (error,result)=>{
        if(error)
            console.log(error)
    })
})

app.get('/api/get/:id',(req,res)=>{
    console.log('hitting',req.params)
    const{id} = req.params

    const sqlGet = 'SELECT * FROM contact_db WHERE id = ?'
    db.query(sqlGet,id,(err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})

app.put('/api/update/:id',(req,res)=>{
    const{id} = req.params;
    const {name,email,contact} = req.body

    const sqlUpdate = 'UPDATE contact_db SET name = ? ,email = ?, contact = ? WHERE id = ?'
    db.query(sqlUpdate,[name,email,contact,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    })
})
app.get('/',(req,res)=>{
    // const sql_insert = "INSERT INTO contact_db (name,email,contact) VALUES('Jhon Cena','jhon@gmail.com','9514141096')";
    // db.query(sql_insert,(err,result) => {
    //     console.log('error',err);
    //     console.log('result',result)
    //     res.send('Hello from server')
    // })
    
})

app.listen(5000, ()=>{
    console.log(`Server is running on the port 5000`)
})