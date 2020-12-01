const asyncErrorWrapper = require('express-async-handler')
const User = require('../models/user/User')
const {sendJwtToClient} = require('../helpers/authentication/tokenHelper')
const {validateUserInput} = require('../helpers/input/inputHelper')
const CustomError = require('../helpers/error/CustomError')

const register = asyncErrorWrapper(async (req, res, next) => {


    const { name, email, password } = req.body


    // if(!validateUserInput(email, password)) {
    //     return next(new CustomError('Please provide valid inputs', 400))
    // }
    const user = await User.create({
        name,
        email,
        password
    })

    sendJwtToClient(user, res)
})

module.exports = register