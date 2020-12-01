const express = require('express')
const solution = require('./solution')
const router = express.Router()
const auth = require('./auth')
const problem = require('./problem')
const comment = require('./comment')

router.use('/auth', auth)
router.use('/problem', problem)
router.use('/solution', solution)
router.use('/comment', comment)

module.exports = router