const Comment = require('../models/comment/Comment')
const Problem = require('../models/problem/Problem')
const Solution = require('../models/solution/Solution')
const User = require('../models/user/User')
const asyncErrorWrapper = require('express-async-handler')


const addCommentToProblem = asyncErrorWrapper(async (req, res, next) => {

    const {content, problemId} = req.body
    
    const newComment = await Comment.create({
        content: content,
        problem: problemId,
        user: req.user.id,
    })

    const problemOfComment = await Problem.findByIdAndUpdate(problemId, {
        $push: { comment: newComment._id }
    })

    const userOfComment = await User.findByIdAndUpdate(req.user.id, {
        $push: { comment: newComment._id }
    })

})

const addCommentToSolution = asyncErrorWrapper(async (req, res, next) => {
    const {content, solutionId} = req.body
    
    const newComment = await Comment.create({
        content: content,
        solution: solutionId,
        user: req.user.id,
    })

    const solutionOfComment = await Solution.findByIdAndUpdate(solutionId, {
        $push: { comment: newComment._id }
    })

    const userOfComment = await User.findByIdAndUpdate(req.user.id, {
        $push: { comment: newComment._id }
    })

    res
    .status(200)
    .json({
        success: true,
    })
})

module.exports = {addCommentToProblem, addCommentToSolution}