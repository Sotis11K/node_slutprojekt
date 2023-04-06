const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: 'nodejs',
  database: '3feb'
});

db.connect(function(err){
  if(err) {
      console.log(err);
  } else {
      console.log('connected to mySQL');
  }
});


module.exports = db;