const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const authMiddleware = require('./utils/auth');
const connection = require('./config/connection');

require('dotenv').config(); // Ensure environment variables are loaded

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Apply middlewares
app.use(cors());
app.use(bodyParser.json()); // Ensure this line is included

// Ensure MongoDB connection is established
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB');
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
});
