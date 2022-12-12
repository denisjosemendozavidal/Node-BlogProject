const postControllers = require('./post.controllers')

const getAllPosts = (req, res) => {
    postControllers.findAllPosts()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const createNewPost = (req, res) => {
    const {title, content, coverUrl, categoryId} = req.body
    const userId = req.user.id

    postControllers.createPost({title, content, coverUrl, categoryId, userId})
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                title: 'string',
                content: 'string',
                coverUrl: 'https://imgur.com/asd.png',
                categoryId: 'number'
            }})
        })
}

module.exports = {
    getAllPosts,
    createNewPost
}