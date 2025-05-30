const connection = require('../data/db')

const index = (req, res) => {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, movieResult) => {
        if (err) return res.status(500).json({ error: `Database query failed` })
        const movies = movieResult.map(movie => {
            const obj = {
                ...movie,
                image: req.imagePath + movie.image
            }
            return obj
        })
        res.json(movies)
    })
}

const show = (req, res) => {
    const movieSql = 'SELECT * FROM movies WHERE id = ?'
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?'
    const { id } = req.params

    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: `Database query failed` })
        if (movieResult.length === 0) return res.status(404).json({ error: `Movie not found` })

        const movie = movieResult[0]

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: `Database query failed` })

            movie.reviews = reviewResult

            res.json(movie)
        })
    })
}

module.exports = {
    index, show
}