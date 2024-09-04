# Base node image
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and nodemon globally
RUN npm install

# Copy the rest of the application code
COPY . .

# build
RUN npm run build

FROM node:18-alpine
WORKDIR /app
# copy from build image
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist

RUN npm install --production

EXPOSE 3000
CMD ["npm","run", "start"]