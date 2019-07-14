const { GraphQLServer } = require("graphql-yoga");
const typeDefs = require("./graphql/types.js");
const resolvers = require("./graphql/resolvers.js");

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    //if we pass anything here can be available in all resolvers
  }
});

server.start(() => console.log("Server is running on localhost:4000☄"));
