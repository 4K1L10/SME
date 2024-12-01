const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',     
    user: 'root',          
    password: '',  
    database: 'home_energey_dbw2'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;