const Comment = require('../models/comment/Comment')
const Problem = require('../models/problem/Problem')
const Solution = require('../models/solution/Solution')
const User = require('../models/user/User')
const asyncErrorWrapper = require('express-async-handler')


const addCommentToProblem = asyncErrorWrapper(async (req, res, next) => {

    const { content, problemId } = req.body
    
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

    res
        .status(200)
        .json({
            success: true,
            data: newComment
    })

})

const addCommentToSolution = asyncErrorWrapper(async (req, res, next) => {
    const {content, solution} = req.body
    
    const newComment = await Comment.create({
        content: content,
        solution: solution,
        user: req.user.id,
    })

    await Solution.findByIdAndUpdate(solution, {
        $push: { comment: newComment._id }
    })

    await User.findByIdAndUpdate(req.user.id, {
        $push: { comment: newComment._id }
    })

    res
    .status(200)
    .json({
        success: true,
    })
})

const editComment = asyncErrorWrapper(async (req, res, next) => {
    const {content, commentId} = req.body
    
    const comment = await Comment.findByIdAndUpdate(commentId, {
        content: content
    })

    res
    .status(200)
    .json({
        success: true,
    })
})

const deleteComment = asyncErrorWrapper(async (req, res, next) => {
    
    if (req.body.problemId) {
        const { problemId, commentId } = req.body
        await Comment.deleteOne({
            _id: commentId
        })
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                comment: commentId
            }
        })
        await Problem.findByIdAndUpdate(problemId, {
            $pull: {
                comment: commentId
            }
        })
        res
        .status(200)
        .json({
            success: true,
            message: 'Deleted!'
    })

    } else {
        const { solutionId, commentId } = req.body
        await Comment.deleteOne({
            _id: commentId
        })
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                comment: commentId
            }
        })
        await Solution.findByIdAndUpdate(solutionId, {
            $pull: {
                comment: commentId
            }
        })
        res
        .status(200)
        .json({
            success: true,
            message: 'Deleted!'
    })
    }
})

module.exports = {addCommentToProblem, addCommentToSolution, editComment, deleteComment}