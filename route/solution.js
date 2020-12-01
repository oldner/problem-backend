const express = require('express')
const router = express.Router()
const { addNewSolution, getSolutions } = require('../controllers/solution')
const { getAccessToRoute } = require('../middlewares/authentication/authentication')

router.post('/addsolution', getAccessToRoute, addNewSolution)
router.post('/getsolutions', getSolutions )

module.exports = router