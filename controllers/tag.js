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

    const { tag } = req.body

    // const tag = await Tag.create({
    //     name: tag,
    //     $push: { problem: newProblem._id }
    // })
})


module.exports = { getTags, addNewTag }