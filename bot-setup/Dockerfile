# Base node image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and nodemon globally
RUN npm install

# Copy the rest of the application code
COPY . .

# Command for development
CMD ["npm", "run", "start"]
