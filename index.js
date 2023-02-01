const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose"); //its an ORM(object elational mapper) that lets us interact with mongo db

const { MONGODB_URL } = require("./config.js");
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')


const PORT = process.env.port || 5000
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req})=>({req}) //takes the req body and will forward it to the context
});

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    return server.listen(PORT);
  })
  .then((res) => console.log(`server running at ${res.url}`))
  .catch(err=>{
    console.error(err)
  })
