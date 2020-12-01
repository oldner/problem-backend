const User = require('../../models/user/User')
const asyncErrorWrapper = require('express-async-handler')
const CustomError = require('../../helpers/error/CustomError')
const Problem = require('../../models/problem/Problem')


const checkProblemExist = asyncErrorWrapper(async (req, res, next) => {

    const {id} = req.params

    const question = Problem.findById(id)

    if(!question) {
        return next(new CustomError('We couldn\'t find a problem like that', 400))
    }
    next()
})

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {

    const {id} = req.params

    const user = User.findById(id)

    if(!user) {
        return next(new CustomError('There is no such user with that id', 400))
    }
    next()
})

module.exports = {checkUserExist, checkProblemExist}