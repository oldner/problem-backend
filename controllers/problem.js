const asyncErrorWrapper = require('express-async-handler')
const CustomError = require('../helpers/error/CustomError')
const Comment = require('../models/comment/Comment')
const Problem = require('../models/problem/Problem')
const Solution = require('../models/solution/Solution')
const User = require('../models/user/User')
const Tag = require('../models/tag/Tag')

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

    const information = req.body

    console.log(information)

    const newProblem = await Problem.create({
        ...information,
        user: req.user.id,
        tag: information.tags
    })

    const userOfProblem = await User.findByIdAndUpdate(req.user.id, {
        $push: { problem: newProblem._id }
    })

    console.log(tags)

    res
    .status(200)
    .json({
        success: true,
        data: newProblem
    })
})

module.exports = {addNewProblem, getAllProblems, getAProblem}