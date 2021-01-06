const express = require('express')
const { addCommentToProblem, addCommentToSolution, editComment } = require('../controllers/comment')
const { getAccessToRoute } = require('../middlewares/authentication/authentication')
const router = express.Router()

router.post('/addcommenttoproblem', getAccessToRoute, addCommentToProblem )
router.post('/addcommenttosolution', getAccessToRoute, addCommentToSolution )
router.post('/editcomment', getAccessToRoute, editComment )

module.exports = router