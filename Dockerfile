# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your Nest.js application code to the container
COPY . .

# Expose the port your Nest.js application is listening on
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:dev"]

# FORCE REBUILD 1
