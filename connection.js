const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'brian_node',
  password: 'briannode',
  database: 'nodejs_projekt'
});

db.connect(function(err){
  if(err) {
      console.log(err);
  } else {
      console.log('connected to mySQL');
  }
});


module.exports = db;