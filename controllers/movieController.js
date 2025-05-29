const connection = require('../data/db')

const index = (req, res) => {
    res.send('Elenco film')
}

const show = (req, res) => {
    res.send('Dettaglio film')
}

module.exports = {
    index, show
}