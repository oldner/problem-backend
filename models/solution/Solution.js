const mongoose = require('mongoose')

const solutionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'You have to enter a content']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    votes: {
        type: Number,
        default: 0
    },
    isSolved: {
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
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})


module.exports = mongoose.model('Solution', solutionSchema)