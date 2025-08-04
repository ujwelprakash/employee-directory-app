import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/", // replace this with your GraphQL URL
  cache: new InMemoryCache(),
});

export default client;
