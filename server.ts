import { Elysia } from 'elysia';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'graphql-tag';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// Define the GraphQL schema with Federation directives
const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external", "@requires", "@provides", "@extends"])

  type Book @key(fields: "isbn") {
    isbn: String!
    title: String
    author: String
    publishedYear: Int
  }

  type Query {
    books: [Book]
    book(isbn: String!): Book
  }
`;

// Sample book data
const books = [
  {
    isbn: "9780451524935",
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949
  },
  {
    isbn: "9780061120084",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960
  },
  {
    isbn: "9780141439518",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publishedYear: 1813
  }
];

// Define resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { isbn }) => books.find(book => book.isbn === isbn)
  },
  Book: {
    __resolveReference: (reference) => {
      // This is the entity resolver for Book by ISBN
      return books.find(book => book.isbn === reference.isbn);
    }
  }
};

async function startApolloServer() {
  // Create Express app and HTTP server
  const app = express();
  const httpServer = http.createServer(app);

  // Create Apollo Server with Federation schema
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start Apollo Server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  // Start HTTP server
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startApolloServer().catch((err) => {
  console.error('Failed to start server:', err);
});
