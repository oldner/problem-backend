const express = require('express')
const { addCommentToProblem, addCommentToSolution, editComment, deleteComment } = require('../controllers/comment')
const { getAccessToRoute } = require('../middlewares/authentication/authentication')
const router = express.Router()

router.post('/addcommenttoproblem', getAccessToRoute, addCommentToProblem )
router.post('/addcommenttosolution', getAccessToRoute, addCommentToSolution )
router.post('/editcomment', getAccessToRoute, editComment )
router.post('/delete/', getAccessToRoute, deleteComment )

module.exports = router