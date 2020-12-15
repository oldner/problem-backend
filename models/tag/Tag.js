const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({

    name: {
        type: String,
        required: ['Lütfen tag seçiniz.', true],
    },
    problems: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Problem'
        }
    ]


})

module.exports = mongoose.model('Tag', tagSchema)