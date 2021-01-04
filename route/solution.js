const express = require('express')
const router = express.Router()
const { addNewSolution, getSolutions, voteSolution, editSolution } = require('../controllers/solution')
const { getAccessToRoute } = require('../middlewares/authentication/authentication')

router.post('/addsolution', getAccessToRoute, addNewSolution)
router.post('/getsolutions', getSolutions )
router.post('/votesolution', getAccessToRoute, voteSolution )
router.post('/edit', getAccessToRoute, editSolution )

module.exports = router