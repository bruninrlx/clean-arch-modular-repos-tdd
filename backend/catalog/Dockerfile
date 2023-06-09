# Define the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy all files from the current directory to the working directory
COPY . .

# Run the build command
RUN yarn run build

# Expose the port on which the application will run
EXPOSE 3000

# Define the command to start the application
CMD ["yarn", "start"]
