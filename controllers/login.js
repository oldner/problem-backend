const asyncErrorWrapper = require('express-async-handler')
const User = require('../models/user/User')
const CustomError = require('../helpers/error/CustomError')
const {sendJwtToClient} = require('../helpers/authentication/tokenHelper')
const {validateUserInput, comparePassword} = require('../helpers/input/inputHelper')

const login = asyncErrorWrapper(async (req, res, next) => {


    const {name, email, password } = req.body;

    // if(!validateUserInput) {
    //     return next(new CustomError('Please enter valid email and password', 400))
    // }

    const user = await User.findOne({email}).select('+password')
    .orFail(err => {
        return next(new CustomError('mailnotfound', 400))
    })
    console.log(user)
    if(!comparePassword(password, user.password)) {
        return next(new CustomError('incorrectpassword', 400))
    }

    sendJwtToClient(user, res)
})

module.exports = login