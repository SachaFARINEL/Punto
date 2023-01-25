const express = require('express')
const router = express.Router()
const boardsController = require('../controllers/boardsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(boardsController.getBoards)
    .patch(boardsController.updateBoard)
    .delete(boardsController.deleteBoard)

router.route('/create')
    .post(boardsController.createNewBoard)

module.exports = router