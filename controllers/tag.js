const asyncErrorWrapper = require('express-async-handler')
const Tag = require('../models/tag/Tag')
const CustomError = require('../helpers/error/CustomError')

const getTags = asyncErrorWrapper(async (req, res, next) => {
    const tags = Tag.find()
        .exec(function (err, post) {
            res
        .status(200)
        .json({
            success: true,
            data: post
    })
    })

})

const addNewTag = asyncErrorWrapper(async (req, res, next) => {

    const { tag } = req.body

    const newTag = await Tag.create({
        name: tag,
    })

    res
        .status(200)
        .json({
            success: true,
            data: newTag
    })
})


module.exports = { getTags, addNewTag }