require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./schema");
const { connectDB } = require("./db");

const startServer = async () => {
  await connectDB();
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
};

startServer();
