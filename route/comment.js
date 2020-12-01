const express = require('express')
const { addCommentToProblem, addCommentToSolution } = require('../controllers/comment')
const { getAccessToRoute } = require('../middlewares/authentication/authentication')
const router = express.Router()

router.post('/addcommenttoproblem', getAccessToRoute, addCommentToProblem )
router.post('/addcommenttosolution', getAccessToRoute, addCommentToSolution )

module.exports = router