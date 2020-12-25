const asyncErrorWrapper = require('express-async-handler')
const CustomError = require('../helpers/error/CustomError')
const Comment = require('../models/comment/Comment')
const Problem = require('../models/problem/Problem')
const Solution = require('../models/solution/Solution')
const User = require('../models/user/User')
const Tag = require('../models/tag/Tag')
const { exists } = require('../models/comment/Comment')

const getAllProblems = asyncErrorWrapper(async (req, res, next) => {

    await Problem.find()
    .populate('user')
    .exec(function(err, post) {
        if(err) {
            console.log(err)
        }
        res
        .status(200)
        .json({
            success: true,
            data: post
        })
    });

})

const getAProblem = asyncErrorWrapper(async (req, res, next) => {

    const {id} = req.params

    const problems = null

    await Problem.findByIdAndUpdate(id, {
        $inc: { views: 1 }
    }, { new: true })
    .populate('user')
    .populate({
       'path': 'comment',
       'populate': {
         'path':'user'
       }
    })
    .populate('tags')
    .exec(function(err, post) {
        if(err) {
            console.log(err)
        }
        res
        .status(200)
        .json({
            success: true,
            data: post
        })
    });
    })


const addNewProblem = asyncErrorWrapper(async (req, res, next) => {

    const {title, content, tags} = req.body
    
    const tagsId = await Tag.find({ name: tags }, '_id').exec()
    const idOfTags = tagsId.map((item) => item._id)

    const newProblem = await Problem.create({
        title: title,
        content: content,
        user: req.user.id,
    })

    await Problem.findByIdAndUpdate(newProblem._id, {
        $push: {
            tags: {
                $each: idOfTags }
        },
    })

    await Tag.updateMany({ _id: idOfTags }, {
        $push: { problems: newProblem._id }
    })

    await User.findByIdAndUpdate(req.user.id, {
        $push: { problem: newProblem._id }
    })

    res
    .status(200)
    .json({
        success: true,
        data: newProblem
    })
})

const voteProblem = asyncErrorWrapper(async (req, res, next) => {

    const { problemId, isUpped } = req.body

    

    if (await User.exists({ votedProblems: problemId })) {
        res
            .status(400)
            .json({
                success: false,
                message: 'ayniproblemebirdenfazla'
            })
    } else {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                votedProblems: problemId
            }
        })

        await Problem.findByIdAndUpdate(problemId,
            {
                $inc: { votes: isUpped ? 1 : -1 }
            },
            { new: true })
            .populate('user')
            .populate({
                'path': 'comment',
                'populate': {
                    'path': 'user'
                }
            })
            .populate('tags')
            .exec(function (err, post) {
                if (err) {
                    console.log(err)
                }
                res
                    .status(200)
                    .json({
                        success: true,
                        data: post
                    })
            })
    }
})

module.exports = {addNewProblem, getAllProblems, getAProblem, voteProblem}