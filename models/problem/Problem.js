const mongoose = require('mongoose')
const slugify = require('slugify')
const Solution = require('../solution/Solution')
const Comment = require('../comment/Comment')

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You have to enter a title']
    },
    content: {
        type: String,
        required: [true, 'You have to enter a content']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String
    },
    solution: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Solution'
        },
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    votes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Tag'
        }
    ]
})

problemSchema.pre('save', function(next) {

    if(!this.isModified('title')) {
        next()
    } else {
        this.slug = this.makeSlug()
        next()
    }

})

problemSchema.methods.makeSlug = function() {
    return slugify(this.title, {
        replacement: '-',  
        remove: /[*+~.()'"!:@?=-]/g, 
        lower: true,      
        strict: false,     
        locale: 'vi'
      })
}

module.exports = mongoose.model('Problem', problemSchema)