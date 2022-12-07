const userControllers = require('./users.controllers')

const getAllUsers = (request, responce) => {
    userControllers.findAllUsers()
        .then((data) => {
            responce.status(200).json(data)
        })
        .catch((err) => {
            responce.status(400).json({message: err.message})
        })
}

const getUserById = (request, responce) => {
    const id = responce.params.id
    
    userControllers.findUserById(id)
        .then((data) => {
            if (data) {
                responce.status(200).json(data)
            } else {
                responce.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            responce.status(400).json({message: err.message})
        })
}

const postUser = (request, responce) => {
    const {first_name, last_name, user_name, email, password, age, country} = request.body
    
    userControllers.createUser({first_name, last_name, user_name, email, password, age, country})
        .then((data) => {
            responce.status(201).json(data)
        })
        .catch((err) => {
            responce.status(400).json({message: err.message, 
                fields: {
                    first_name: 'string',
                    last_name: 'string',
                    user_name: 'string',
                    email: 'string',
                    password: 'string',
                    age: 'number',
                    country: 'COL',
                } })
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser,
}