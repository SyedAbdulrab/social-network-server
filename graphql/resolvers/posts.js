const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getPosts: async () => {
      console.log('getPosts')

      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    getPost: async (_, { postId }) => {
      console.log('getPost')

      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post Not Found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      console.log('createPost')
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty!")
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    deletePost: async (_, { postId }, context) => {
      console.log('deletePost')
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        console.log(post);
        if (user.username === post.username) {
          await post.delete();
          return "Post Deleted Successfully";
        } else {
          throw new AuthenticationError("Action Not Allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost : async (_,{postId},context) => {
          console.log('likePost')
          const user = checkAuth(context)
          const post = await Post.findById(postId)
          if (post){
            if(post.likes.find(like => like.username === user.username)){
                //post already liked, unlike it
              post.likes = post.likes.filter(like=> like.username !== user.username);
              
            }
            else {
              // liking a post for the first time
              post.likes.push({
                username:user.username,
                createdAt:new Date().toISOString()  
              })
            }
            await post.save()
            return post;
          }
          else {
            throw new UserInputError("Post not found")
          }
    }     
  },
};
