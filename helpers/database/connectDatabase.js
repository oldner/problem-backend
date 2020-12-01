const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        family:4,
        useNewUrlParser: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('MongoDB connection is succesful')
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports = connectDatabase