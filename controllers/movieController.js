const connection = require('../data/db')

const index = (req, res) => {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, movieResult) => {
        if (err) res.status(500).json({ error: `Database query failed: ${err.message}` })

        res.json(movieResult)
    })
}

const show = (req, res) => {
    res.send('Dettaglio film')
}

module.exports = {
    index, show
}