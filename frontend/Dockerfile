# # Stage 1: Build the React application with Vite
# FROM node:14 AS build

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json (or yarn.lock) if you have one
# COPY package*.json ./

# # Clean npm cache and install dependencies
# RUN npm cache clean --force && npm install

# # Copy the rest of the frontend code
# COPY . .

# # Build the Vite application
# RUN npm run build

# #Print working directory
# RUN pwd 

# # Stage 2: Serve the application with Nginx
# FROM nginx:alpine

# # Copy the build output to replace the default nginx contents
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose the nginx port
# EXPOSE 80

# # Command to run nginx
# CMD ["nginx", "-g", "daemon off;"]


# # Stage 1: Build the React application with Vite
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

# # Clean npm cache and install dependencies
RUN npm cache clean --force && npm install


COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]