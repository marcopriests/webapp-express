const express = require('express')
const app = express()
const port = process.env.PORT

const movieRouter = require('./routers/movieRouter')

const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')
const imagePath = require('./middlewares/imagePath')

app.use(express.static('public'))

app.use(express.json())

app.use(imagePath)

app.get('/', (req, res) => {
    res.send('Movies API server')
})

app.use('/movies', movieRouter)

app.use(errorsHandler)

app.use(notFound)

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})