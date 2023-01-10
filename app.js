const connDb = require("./utils/databse.js");

const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers/resolver.js");
const dotenv = require("dotenv");
dotenv.config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>({req})
});
//sync with database connection
connDb
  .then(() => {
    console.log(`Database connected successfully!🔥🔥🔥`);
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res?.url}`);
  });
