const gql = require("graphql-tag");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments:[Comment]!
    likes:[Like]!
    likesCount:Int!
    commentsCount:Int!
  }

  type Comment{
    id:ID!
    createdAt:String!
    username:String!
    body:String!
  }
  type Like{
    id:ID!
    createdAt:String!
    username:String!
  }

  input RegisterInput {
        username:String!
        password:String!
        confirmPassword:String!
        email:String!
  }
  type User{
    id:ID!
    email:String!
    username:String!
    password:String!
    token:String!
    createdAt:String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId:ID!):Post
  }

  type Mutation {
    register(registerInput: RegisterInput):User!
    login(username:String!,password:String!):User!
    createPost(body: String!):Post!
    deletePost(postId:ID!):String!
    createComment(postId:String!,body:String):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID!):Post!
  }
`;
