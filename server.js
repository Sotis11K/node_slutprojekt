const express = require('express');
const app = express();
const db = require('./connection');

const path = require('path');
const upload = require('./uploads');
app.use(express.static(path.resolve('./public')));



var obj = {};

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');


app.get('/', function(req,res){
    let sql = 'SELECT * FROM table_node ORDER BY date_added DESC';
    db.query(sql, function(err, results){
        if(err) {
            throw err;
        } else {
            obj = {data: results};
            res.render('index', obj)
        }
    });
});
     

app.get('/login', function(req, res){
    res.render('login')
})

app.get('/register', function(req, res){
    res.render('register')
})

app.get('/settings', function(req, res){
    res.render('settings')
})

 app.get('/post', function(req,res){
    res.render('post')
 });

 app.post('/register', function(req,res){
    const username = req.body.username;
    const sqlInstert = "INSERT INTO users (username) VALUES (?);"
    db.query(sqlInstert, [username], (err, result)=> {
        if(err) {
            throw err;
        } else {
            res.render ('index');
        }
    });
 });
 


app.listen(process.env.PORT || 3000, function(){
   console.log('server, port 3000');
});
