const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const resolvers = {
  Query: {
    getUser: async (parent, { email }) => {
      return await User.findOne({ email });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Incorrect password');
      }
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { id: user._id, email: user.email, token };
    },
    register: async (parent, { email, password }) => {
      console.log('Register mutation called with email:', email);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
      });
      try {
        const savedUser = await user.save();
        console.log('User saved:', savedUser);
        return { id: savedUser._id, email: savedUser.email };
      } catch (error) {
        console.error('Error saving user:', error);
        throw new Error('Error saving user');
      }
    },
  },
};

module.exports = resolvers;
