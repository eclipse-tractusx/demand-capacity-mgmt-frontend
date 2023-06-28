# Base image
FROM node:16.15.1

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock from two folders up
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the app source code
COPY . .

# Build the app
RUN yarn build

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
