const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const { json } = require('body-parser');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const authMiddleware = require('./utils/auth');
const connection = require('./config/connection');  // Import mongoose configuration

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Apply middlewares
app.use(cors());
app.use(json());

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = authMiddleware(token);
    return { user };
  },
});

// Start Apollo Server and apply middleware
async function startServer() {
  await server.start();
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = authMiddleware(token);
      return { user };
    },
  }));

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
