# Base node image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and nodemon globally
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command for development
CMD ["npm", "run", "dev"]
