# Use an official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) if you have one
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . /app

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]
