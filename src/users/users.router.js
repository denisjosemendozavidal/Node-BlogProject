const router = require('express').Router()
const passportJWT = require('../middleware/auth.middleware')

const userServices = require('./users.services')

router.get('/', passportJWT.authenticate('jwt', {session: false}), userServices.getAllUsers)

router.post('/', userServices.postUser)

router.get('/:id', userServices.getUserById )


module.exports = router