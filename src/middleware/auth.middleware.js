const JwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;

const passport = require('passport')

const jwtSecrete = require('../../config').api.jwtSecret
const { findUserById } = require('../users/users.controllers')

    const options = {
        jwtFromRequest : Extractjwt.fromAuthHeaderWithScheme('jwt'),
        secreteOrKey : jwtSecrete,
    }

    passport.use(
        new JwtStrategy(options, async (tokenDecoded, done) => {
            
            try {
                const user = await findUserById(tokenDecoded.id)
                if (!user) {
                    return done(null, false)
                } 

                return done(null, tokenDecoded)
            } catch (error) {
                return done(error, false)
            }

        })
    )



module.exports = passport