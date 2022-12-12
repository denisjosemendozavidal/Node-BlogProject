const Users = require('./users.models')
const Categories = require('./categories.models')
const Posts = require('./posts.models')


const initModels = () => {
    Categories.hasMany(Posts)
    Posts.belongsTo(Categories)
    Posts.belongsTo(Users)
    Users.hasMany(Posts)
}

module.exports = initModels