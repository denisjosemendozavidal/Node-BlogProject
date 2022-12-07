const jwt = require('jsonwebtoken')

const checkUserCredential = require('./auth.controllers')
const jwtSecret = require('../../config').api.jwtSecret

const postLogin = (request, response) => {

    const {email, password} = request.body

    if (email && password) {
        checkUserCredential(email, password)
            .then((data) => {
                if (data) {
                    const token = jwt.sign({
                        id : data.id,
                        user_name : data.user_name,
                        role: data.role
                    }, jwtSecret //can add expiration here by adding: {expiresIn: lenght of time}
                    )

                    response.status(200).json({
                        message: 'Correct Credentials',
                        token: token,
                    })

                } else {
                    response.status(401).json({message: 'Invalid Credentials'})
                }
            })
            .catch((err) => {
                response.status(400).json({message: err.message})
            })
    } else {
        response.status(400).json({message: 'Missing Data', fields: { email: 'example@email.com', password: 'string'}})
    }

}

module.exports = {
    postLogin,
}