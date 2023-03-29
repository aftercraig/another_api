const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/newdbapi.db');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.listen(8000,()=>{
    console.log('Server Started')
})

app.get('/', (req, res) => {
    res.json('yeah')
})

app.get('/info',(req, res) =>{
    db.all(`SELECT * FROM info`,(err, rows) =>{
        res.json(rows)
        
    })
})

app.put('/info/:id',(req, res) =>{
        db.all(`UPDATE name FROM info`,(err, rows) =>{
            res.json(rows)
        })
    res.json('updated')
})

app.delete('/info/:id',(req, res) =>{
    const {id} = req.params
    const request = `DELETE FROM info WHERE 
        id=${id}`  
        db.run(request, (err) => {
            if(err) {
                res.json(err)
            }
            res.json('task removed')
        })
})

app.post('/info',(req, res) =>{
    const data = req.body
    const request = `INSERT INTO info VALUES (
        null,
        '${data.date}',
        '${data.name}',
        '${data.desc}',
        '${data.status}')`

    db.run(request,(err) =>{
        if (err) {
            res.json(err)
        }
        res.json('approved')
    })
})
