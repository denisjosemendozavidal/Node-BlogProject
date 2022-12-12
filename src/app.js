const express = require('express')
const app = express()
const db = require('./utils/database')
const port = require('../config').api.port
const initModels = require('./models/initModels')
const userRouter = require('./users/users.router')
const authRouter = require ('./auth/auth.router')
const postRouter = require('./posts/post.router')

db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err))

initModels()

app.use(express.json())



app.get('/', (request, response) => {
    response.status(200).json({message: 'OK!'})
})

app.use('/api/v1/users', userRouter)

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/posts', postRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})




