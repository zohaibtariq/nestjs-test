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

# Copy the wait-for-elasticsearch.sh script to the container
COPY wait-for-elasticsearch.sh .

# Make the script executable
RUN chmod +x wait-for-elasticsearch.sh

# Expose the port your Nest.js application is listening on
EXPOSE 3000

# Run the wait-for-elasticsearch.sh script to wait for Elasticsearch to start and then start the Nest.js application at end
CMD ["./wait-for-elasticsearch.sh", "elasticsearch:9200", "--", "npm", "run", "start:dev"]
#CMD ["./wait-for-elasticsearch.sh", "elasticsearch:9200", "--", "npm", "run", "start"]