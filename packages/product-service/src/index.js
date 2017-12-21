const { graphql, buildSchema } = require('graphql');
const { GraphQLServer } = require('graphql-yoga');
const redis = require('redis');

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

const db = redis.createClient();
db.on('error', err => console.log(`Error ${err}`));

server.start(_ => console.log(`
endpoint:   localhost:${options.port}${options.endpoint}
playground: localhost:${options.port}${options.playgroundEndpoint}
`));
