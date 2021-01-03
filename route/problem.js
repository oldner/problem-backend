const express = require('express')
const router = express.Router()
const {addNewProblem, getAllProblems, getAProblem, voteProblem, editProblem} = require('../controllers/problem')
const {getAccessToRoute} = require('../middlewares/authentication/authentication')
const { checkProblemExist } = require('../middlewares/database/databaseErrorHelpers')

router.post('/add', getAccessToRoute, addNewProblem)
router.get('/getall', getAllProblems)
router.get('/:id/', checkProblemExist, getAProblem)
router.post('/voteproblem', getAccessToRoute, voteProblem)
router.post('/edit', getAccessToRoute, editProblem)

module.exports = router