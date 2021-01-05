const { json } = require('express')
const asyncErrorWrapper = require('express-async-handler')

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    res
        .status(200)
    json({
        success: true,
        message: 'Successfully uploaded!'
    })
})

module.exports = {imageUpload}