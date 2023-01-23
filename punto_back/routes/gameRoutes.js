const express = require('express')
const router = express.Router()
const gamesController = require('../controllers/gamesController')

router.route('/')
    .get(gamesController.getGames)
    .post(gamesController.createNewGame)
    .patch(gamesController.updateGame)
    .delete(gamesController.deleteGame)

module.exports = router