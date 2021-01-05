const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        minlength: [2, 'name2']
    },
    email: {
        type: String,
        required: [true, 'You have to enter an email'],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please provide a valid email address.'
        ]
    },
    password: {
        type: String,
        required: [true, 'You have to enter a password'],
        minlength: [6, 'password6'],
        select: false
    },
    profilepic: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    age: {
        type: Number
    },
    blocked: {
        type: Boolean,
        default: false
    },
    problem: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem'
        },
    ],
    solution: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Solution'
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    votedProblems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem'
        },
    ],
})

userSchema.methods.generateJwtFromUser = function() {
    const {JWT_SECRET_KEY, JWT_EXPIRES} = process.env
    const payload = {
        id: this.id,
        name: this.name
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES
    })

    return token
}

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) next(err)
            this.password = hash
            next()
        })
    })

})

module.exports = mongoose.model('User', userSchema)