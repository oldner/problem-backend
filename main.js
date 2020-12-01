const express = require('express')
const app = express()
const router = require('./route/index')
const connectDatabase = require('./helpers/database/connectDatabase')
const dotenv = require('dotenv')
const customErrorHandler = require('./middlewares/errors/customErrorHandler.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config({
    path: './config/config.env'
})


connectDatabase()

app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:8080',
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization', 'Set-Cookie', 'Cookie'],
    credentials: true
}))

app.use(express.json())

app.use('/api', router)

app.use(customErrorHandler)

app.listen(process.env.PORT, () => {
    console.log('server listening on' + process.env.PORT)
})
