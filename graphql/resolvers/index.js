const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')
module.exports = {
    Post:{
        likesCount:(parent)=>parent.likes.length,
        commentsCount:(parent)=>parent.comments.length
    },
    Query : {
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers
    }
}