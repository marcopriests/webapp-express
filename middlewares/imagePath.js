const setImagePath = (req, res, next) => {
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies/`
    console.log(req.imagePath)

    next()
}

module.exports = setImagePath