# Use an official Node.js runtime as a parent image
FROM node:24

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 3500

# Define the command to run your application
CMD ["yarn", "start"]
