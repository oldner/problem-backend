const asyncErrorWrapper = require('express-async-handler')
const Tag = require('../models/tag/Tag')
const CustomError = require('../helpers/error/CustomError')

const getTags = asyncErrorWrapper(async (req, res, next) => {

    const tags = Tag.find()

    res
        .status(200)
        .json({
            success: true,
            data: tags
    })

})

const addNewTag = asyncErrorWrapper(async (req, res, next) => {

    console.log(req.body)

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