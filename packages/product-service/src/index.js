const { graphql, buildSchema } = require('graphql');
const { GraphQLServer } = require('graphql-yoga');

const types = require('./types');
const resolvers = require('./resolvers');

const options = {
  port: 8080,
  endpoint: '/',
  playgroundEndpoint: '/playground',
};

const server = new GraphQLServer({
  typeDefs: types,
  resolvers,
  options,
});

server.start(_ => console.log(`
endpoint:   localhost:${options.port}${options.endpoint}
playground: localhost:${options.port}${options.playgroundEndpoint}
`));
