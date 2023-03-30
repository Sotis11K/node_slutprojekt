

const express = require('express');
const app = express();
const db = require('./connection');
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializedPassport = require('./passport') 
const flash = require('express-flash')
const session = require('express-session')

const cookieParser = require('cookie-parser');
app.use(cookieParser());


initializedPassport(passport, email => {
    passport,
    email => users.find(user => user.email === email),
    id => user.find(user => user.id === id)
})
const path = require('path');
const upload = require('./uploads');
const { Passport } = require('passport');
app.use(express.static(path.resolve('./public')));




var obj = {};

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

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
     
/*
 app.post('/login', passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/login',
     failureFlash: true
 }))
*/

app.post('/login', function(res, request){
    const req=request.query
const query="SELECT password from users where password=?";
const params=[request.password]
db.query(query,params,(err,rows) => {
  if(err) throw err;
  //
  var output={}
  if(rows.length!=0)
  {
	var password_hash=rows[0]["password"];
	const verified = bcrypt.compareSync(req.password, password_hash);
	if(verified)
	{
        window.location.replace('/')
	}else{
    output["status"]=0;
    output["message"]="Invalid password";
	}

  }else{
    output["status"]=0;
    output["message"]="Invalid username and password";
  }
  //res.json(output)

});
});
app.get('/login', function(req, res){
    res.render('login')
})

app.post('/login', (req, res) =>{
    query = `SELECT * FROM users WHERE username = "${username}"`;
    console.log(username)

})

app.get('/settings', function(req, res){
    res.render('settings')
})

 app.get('/register', function(req,res){
    res.render('register')
 });

app.post('/settings', (req, res) =>{
    const color = req.body.color
    const sqlInstert = "INSERT INTO user_settings (themeColor) VALUES (?);"
    db.query(sqlInstert, [color])
})

 app.post('/register', async (req,res) =>{
     try{
         const hashedPassword = await bcrypt.hash(req.body.password, 11)
         const username = req.body.username;
         const email = req.body.email;
         const password = req.body.password;
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
