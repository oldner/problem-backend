const express = require('express')
const router = express.Router()
const { getTags, addNewTag } = require('../controllers/tag')
const {getAccessToRoute} = require('../middlewares/authentication/authentication')

router.get('/getalltags', getTags)
router.post('/addatag', getAccessToRoute, addNewTag)

module.exports = router