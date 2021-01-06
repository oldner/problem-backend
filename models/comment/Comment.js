const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'You have to enter a content']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isFunctional: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    solution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solution'
    },
    editIndex: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Comment', commentSchema)