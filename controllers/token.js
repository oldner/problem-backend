const asyncErrorWrapper = require('express-async-handler')
const User = require('../models/user/User')
const CustomError = require('../helpers/error/CustomError')


const token = asyncErrorWrapper(async (req, res, next) => {

    const user = await User.findById(req.user.id)


    return res
    .status(200)
    .json({
        success: true,
        name: req.user.name,
        token: req.token,
        user: user
    });
});


module.exports = token