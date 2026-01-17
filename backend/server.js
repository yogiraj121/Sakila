import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './src/schema.js';
import dotenv from 'dotenv';
dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
