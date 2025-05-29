const express = require('express')
const app = express()
const port = process.env.PORT

const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')

app.use(express.static('public'))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Movies API server')
})

// app.use('/posts', postRouter)

app.use(errorsHandler)

app.use(notFound)

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})