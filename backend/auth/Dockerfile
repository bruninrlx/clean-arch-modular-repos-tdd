# Define the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install project dependencies
RUN yarn install --production

# Copy the TypeScript configuration files
COPY tsconfig*.json ./

# Copy the env configuration files
COPY .env ./

# Copy only the necessary source code directories (src and test and prisma)
COPY src/ ./src/
COPY test/ ./test/
COPY prisma/ ./prisma/

# Generate the Prisma client
RUN npx prisma generate

# Build the project
RUN yarn run build

# Remove the source code directories (src and test)
RUN rm -rf src test prisma

# Define the command to start the application
CMD ["node", "dist/main_api.js"]
