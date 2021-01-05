const { json } = require('express')
const asyncErrorWrapper = require('express-async-handler')
const User = require('../models/user/User')

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    
    const user = await User.findByIdAndUpdate(req.user.id, {
        profilepic: req.savedProfileImage
    })

    res
        .status(200)
    .json({
        success: true,
        message: 'Successfully uploaded!'
    })
})

module.exports = {imageUpload}