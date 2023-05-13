/*const express = require('express');
const app = express();
const db = require('./connection');
const bcrypt = require('bcrypt')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const path = require('path');



app.use(express.static(path.resolve('./public')));

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    const img = req.file ? req.file.buffer.toString('base64') : null;
    res.render('index', { img: img });
  });

app.post('/register', upload.single('img'), async (req,res) => {

    try {
      const img = req.file.buffer.toString('base64');
      const hashedPassword = await bcrypt.hash(req.body.password, 11);
      const password = req.body.password;
      const country = req.body.country;
      const username = req.body.username;
      const email = req.body.email;
      const sqlInsert = "INSERT INTO users (username, email, country, password, img) VALUES (?, ?, ?, ?, ?)";
      db.query(sqlInsert, [username, email, country, hashedPassword, img]);
      console.log(img);
      //res.redirect('/login');
    } catch(error) {
      console.log(error);
      //res.redirect('/register');
    }
  });*/

  
  
  const express = require('express');
  const app = express();
  const path = require('path');
  const db = require('./connection');
  const bcrypt = require('bcrypt')
  const multer = require('multer');


  var randomNumber = Math.floor(Math.random() * 1000000);
   const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/assets/Images')
    },
    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, randomNumber + path.extname(file.originalname))
    }
})

   const upload = multer({storage: storage})
  
  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: false }))
  
  app.use(express.static(path.resolve('./public')));
  
  app.set('view engine', 'ejs');
  
  

  app.get('/', function(req, res) {
      res.render('index');
  });
  
 
//   app.post('/upload', upload.single('file'), function(req, res) {
//     res.send('File uploaded successfully.');
//     console.log('File uploaded successfully.');
//   });
  






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
                res.redirect('/')
            } else {
                res.status(401).send("Email or password is incorrect.");
            }
        }
    });
});


app.get('/get_data', function(request, response, next){

    var search_query = request.query.search_query;
    var query = `
    SELECT username FROM users
    WHERE username LIKE '%${search_query}%' 
    LIMIT 10
    `;
    db.query(query, function(error, data){
        response.json(data);
    });

});


app.get('/data', (req, res) => {
    db.query('SELECT * FROM users', (error, results, field) =>{
        if(error){
            console.error(error)
        }else{
            res.json(results)
        }
    })
  });
  





app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/settings', function(req, res){
    res.render('settings')
})


app.get('/logout', (req, res) =>{
    res.render('logout')
})

 app.get('/register', function(req,res){
    res.render('register')
 });

 
  

app.post('/settings', (req, res) =>{
    try{

        const color = req.body.color
        const sqlInsert = "INSERT INTO user_settings (themeColor) VALUES (?);"
        db.query(sqlInsert, [color])
        res.redirect("/settings")
    }
    catch{
        res.redirect('/settings')
    }
    
})



 /*app.post('/register', upload.single('img'), async (req,res) =>{
     try{
        const img = req.file.buffer.toString('base64');
         const hashedPassword = await bcrypt.hash(req.body.password, 11)
         const password = req.body.password
         //const img = req.file.filename;
         const country = req.body.country
         const username = req.body.username;
         const email = req.body.email;
         const sqlInsert = "INSERT INTO users (username, email, country, password, img) VALUES (?, ?, ?, ?, ?)";
         db.query(sqlInsert, [username, email, country, hashedPassword, img])
        console.log(img)
         //res.redirect('/login')
     }
     catch{
         res.redirect('/register')
     }
 });*/

 
  
  
 app.post('/register', upload.single('img'), async (req,res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 11);
      const password = req.body.password;
      const country = req.body.country;
      const username = req.body.username;
      const email = req.body.email;
    const img = "/assets/Images/" + (randomNumber + path.extname(req.file.originalname))
      const sqlInsert = "INSERT INTO users (username, email, country, password, img) VALUES (?, ?, ?, ?, ?)";
      db.query(sqlInsert, [username, email, country, hashedPassword, img]);
      res.redirect('/login');
    } catch(error) {
      console.log(error);
      res.redirect('/register');
    }
});



 


app.listen(process.env.PORT || 3000, function(){
   console.log('server, port 3000');
});


