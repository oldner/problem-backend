const asyncErrorWrapper = require('express-async-handler')
const Solution = require('../models/solution/Solution')
const {addSolutionToProblem} = require('../controllers/problem')
const Problem = require('../models/problem/Problem')
const User = require('../models/user/User')


const addNewSolution = asyncErrorWrapper(async (req, res, next) => {

    const information = req.body
    
    const newSolution = await Solution.create({
        content: information.content,
        user: req.user.id,
        problem: information.problem
    })

    const problemOfSolution = await Problem.findByIdAndUpdate(req.body.problem, {
            $push: { solution: newSolution._id }
    })

    const userOfSolution = await User.findByIdAndUpdate(req.user.id, {
        $push: { solution: newSolution._id }
    })


    res
    .status(200)
    .json({
        success: true,
        data: newSolution
    })
})

const getSolutions = asyncErrorWrapper(async (req, res, next) => {

    const {problemId} = req.body

    const solutionToSend = await Solution.find({ problem: problemId })
    .populate('user')
    .populate({
        'path': 'comment',
        'populate': {
            'path': 'user'
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

const voteSolution = asyncErrorWrapper(async (req, res, next) => {

    const { solutionId, isUpped } = req.body

    

    if (await User.exists({ votedProblems: solutionId })) {
        res
            .status(400)
            .json({
                success: false,
                message: 'aynisolutionbirdenfazla'
            })
    } else {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                votedProblems: solutionId
            }
        })

        await Solution.findByIdAndUpdate(solutionId,
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

module.exports = { addNewSolution, getSolutions, voteSolution }