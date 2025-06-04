const express = require('express')

const router = express.Router()

const upload = require('../middlewares/multer')

const movieController = require('../controllers/movieController')

router.get('/', movieController.index)

router.get('/:id', movieController.show)

router.post('/', upload.single('image'), movieController.store)

module.exports = router