const express = require('express')
const router = express.Router()
const register = require('../controllers/register')
const login = require('../controllers/login')
const {getAccessToRoute} = require('../middlewares/authentication/authentication')
const token = require('../controllers/token')

router.post('/register', register)
router.post('/login', login)
router.get('/VpW02cG0W2vGeGXs8DdLIq3dQ62qMd0', getAccessToRoute, token)

module.exports = router