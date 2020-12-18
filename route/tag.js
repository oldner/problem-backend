const express = require('express')
const { getTags, addNewTag } = require('../controllers/tag')
const {getAccessToRoute} = require('../middlewares/authentication/authentication')
const router = express.Router()

router.get('/getalltags', getTags)
router.post('/addatag', getAccessToRoute, addNewTag)

module.exports = router