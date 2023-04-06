

const express = require('express');
const app = express();
const db = require('./connection');
const bcrypt = require('bcrypt')
//const passport = require('passport')
//const initializedPassport = require('./passport') 
const flash = require('express-flash')
const session = require('express-session')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


// initializedPassport(passport, email => {
//     passport,
//     email => users.find(user => user.email === email),
//     id => user.find(user => user.id === id)
// })
const path = require('path');
const upload = require('./uploads');
// const { Passport } = require('passport');
 app.use(express.static(path.resolve('./public')));



/*
var obj = {};

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));
*/

app.set('view engine', 'ejs');

app.post('/login', async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    let sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async function(err, results) {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("An error occurred while logging in.");
        } else if (results.length === 0) {
            res.status(401).send("Email or password is incorrect.");
        } else {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.send("Logged in successfully!");
            } else {
                res.status(401).send("Email or password is incorrect.");
            }
        }
    });
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/settings', function(req, res){
    res.render('settings')
})

app.get('/', (req, res) =>{
    res.render('index')
})

 app.get('/register', function(req,res){
    res.render('register')
 });


app.post('/settings', (req, res) =>{
    const color = req.body.color
    const sqlInstert = "INSERT INTO user_settings (themeColor) VALUES (?);"
    db.query(sqlInstert, [color])
})

app.get('/settings', (res, req) =>{
    let sql = 'SELECT * FROM user_settings';
    db.query(sql, function(err, results){
        if(err) {
            throw err;
        } else {
            obj = {data: results};
            res.render('index', obj)
        }
    });
})
    

 app.post('/register', async (req,res) =>{
     try{
         const hashedPassword = await bcrypt.hash(req.body.password, 11)
         const username = req.body.username;
         const email = req.body.email;
         const sqlInstert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?);"
         db.query(sqlInstert, [username, email, hashedPassword])
         res.redirect('/login')
     }
     catch{
         res.redirect('/register')
     }

 });
 


app.listen(process.env.PORT || 3000, function(){
   console.log('server, port 3000');
});
