

const typeDefs = `
  type User {
    id: ID!
    email: String!
    token: String
  }

  type Query {
    getUser(email: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): User
    register(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
