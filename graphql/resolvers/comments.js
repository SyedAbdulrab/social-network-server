const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");
const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");

module.exports = {
  createComment: async (_, { postId, body }, context) => {
    console.log("createComment");
    const user = checkAuth(context);
    if (body.trim() === "") {
      throw new UserInputError("Empty Comment", {
        errors: {
          body: "Comment body must not be empty",
        },
      });
    }
    const post = await Post.findById(postId);
    if (post) {
      post.comments.unshift({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      await post.save();
      return post;
    } else {
      throw new UserInputError("Post Not Found");
    }
  },
  deleteComment: async (_, { postId, commentId }, context) => {
    console.log("deleteComment");
    const user = checkAuth(context);
    const post = await Post.findById(postId);
    if (post) {
      const commentIndex = post.comments.findIndex(
        (comment) => comment.id === commentId
      );
      if (post.comments[commentIndex].username === user.username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return post;
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    } else {
      throw new UserInputError("Post not found");
    }
  },
};
