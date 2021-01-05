const express = require('express')
const { imageUpload } = require('../controllers/upload')
const { getAccessToRoute } = require('../middlewares/authentication/authentication')
const profileImageUpload = require('../middlewares/libraries/profileImageUpload')
const router = express.Router()

router.post('/profilepic', [getAccessToRoute, profileImageUpload.single('profile_image')], imageUpload)

module.exports = router