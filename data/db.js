const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_movies'
})

connection.connect((err) => {
    if (err) {
        console.log(`Error to connect to MySQL: ${err}`)
    } else {
        console.log('Connected to MySQL')
    }
})

module.exports = connection