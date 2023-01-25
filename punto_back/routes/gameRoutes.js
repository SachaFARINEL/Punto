const express = require('express')
const router = express.Router()
const gamesController = require('../controllers/gamesController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(gamesController.getGames)
    .post(gamesController.createNewGame)
    .patch(gamesController.updateGame)
    .delete(gamesController.deleteGame)

module.exports = router