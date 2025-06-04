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

    const avgVote = 'SELECT M.*, ROUND(AVG(R.vote)) AS average_vote FROM movies M LEFT JOIN reviews R ON R.movie_id = M.id WHERE M.id = ?'

    const { id } = req.params

    connection.query(avgVote, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: `Database query failed ${err}` })
        if (movieResult.length === 0) return res.status(404).json({ error: `Movie not found` })

        const movie = movieResult[0]

        movie.image = req.imagePath + movie.image

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: `Database query failed` })

            movie.reviews = reviewResult

            res.json(movie)
        })
    })
}

const store = (req, res, next) => {
    const { title, director, abstract } = req.body

    const sql = 'INSERT INTO movies (title, director, abstract, image) VALUES (?,?,?,?)'

    const imageName = req.file.filename

    connection.query(sql, [title, director, abstract, imageName], (err, result) => {
        if (err) { return next('Errore di caricamento') }

        res.status(201).json({
            status: 'success',
            message: 'film inserito con successo'
        })
    })
}

module.exports = {
    index, show, store
}