const express = require('express')
const router = express.Router()
const cardsController = require('../controllers/cardsController')

router.route('/')
    .get(cardsController.getAllCards)
    .patch()
    .delete()

module.exports = router