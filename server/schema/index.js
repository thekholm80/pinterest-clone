
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  User {
    firstName: String
    lastName: String
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
