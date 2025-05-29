const connection = require('../data/db')

const index = (req, res) => {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, movieResult) => {
        if (err) return res.status(500).json({ error: `Database query failed` })

        res.json(movieResult)
    })
}

const show = (req, res) => {
    const sql = 'SELECT * FROM movies WHERE id = ?'
    const { id } = req.params
    connection.query(sql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: `Database query failed` })
        if (movieResult.length === 0) return res.status(404).json({ error: `Movie not found` })

        res.json(movieResult)
    })
}

module.exports = {
    index, show
}