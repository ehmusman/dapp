# Project Documentation

## Prerequisites

- **Docker Version**: 27.2.0

- **Docker-Compose Version**: 1.29.2

- **Node.js**: >18.17.0

- **NPM**

### Telegram Bot Integration 
**Important**: 
To see the live bot chat in this app, you must **sign up with the same username** that you are using on Telegram. You can start the chat with our Telegram bot using the following link: 
[AssessmentDAPP\_bot](https://t.me/AssessmentDAPP_bot).


## Services in Docker-Compose

1. **Backend**:

- Runs the Node.js backend in production.

- Accessible at `localhost:4000`.

2. **Frontend**:

- Runs the Next.js frontend in production.

- Accessible at `localhost:3000`.

3. **Ngrok**:

- Establishes a tunnel for external access, allowing the Telegram webhook to receive real-time data.

- Accessible at `localhost:4040`.

4. **Bot-Setup**:

- A script that registers the Telegram webhook using the Ngrok URL.

5. **DB**:

- Runs PostgreSQL database in a container.

- Internal port: `5432`, External port: `5555`.

- Can be connected on port `5555` with pgAdmin to check database tables.

- Uses Docker volume for data persistence.

6. **Test-DB**:

- PostgreSQL database for testing.

- Internal port: `5432`, External port: `5556`.

## Running the Project

### In Production

To run the project in production and detached mode:

```bash
docker-compose up --build -d
```

To stop the running services:

```bash
docker-compose down
```

## Backend

### Tech Stack

- **TypeScript**

- **Node.js**

- **Express.js**

- **Sequelize**: ORM for PostgreSQL.

- **PostgreSQL**: Database.

- **Express Validator**: For validation of incoming data.

- **Sequelize CLI**: For generating migrations.

- **Vitest**: For testing.

- **Winston**: For logging errors in production.

- **Socket.IO**: For sending real-time Telegram events to the frontend.

- **JWT**: For user authentication.

- **Bcrypt**: For hashing passwords.

### Endpoints

- **POST /api/auth/login**: User login.

- **POST /api/auth/register**: User registration.

- **GET /api/profile**: Protected endpoint for getting user's data and Telegram bot data.

- **POST /api/data/bot${telegram-bot-token}**: Endpoint for receiving data from Telegram bot.

### Running the Backend

To run the backend:

```bash
docker-compose up --build -d backend db
```

The Node.js server will start at `localhost:4000`.

You can import the Postman API documentation named `api.postman_collection.json` to Postman for testing the APIs.

### Running Tests

1. Start the test database:

```bash
docker-compose up --build -d test-db
```

2. Install dependencies in the backend directory:

```bash
   npm install
```

3. Run the tests:

`bash
   npm run test
   `

To see the tests visually:

```bash
npm run test:ui
```

## Frontend

### Tech Stack

- **Next.js**

- **TypeScript**

- **Axios**: For HTTP requests.

- **Ethers.js**: For web3 integration.

- **React Hook Form**: For managing controlled components.

- **Zod**: For form data validation.

- **Socket.IO Client**: For receiving real-time data from the backend.

- **@testing-library/jest-dom**, **@testing-library/react**, **@vitest/ui**, **Vitest**, **jsdom**: For testing React components.

### State Management

- **React Context API**: For global state management.

- **UserContext**: For managing user data.

- **WalletContext**: For managing wallet data.

- Custom hooks are created for accessing context state and maintaining clean code.

### Component Reusability

- Custom reusable components are used, such as Button, Input with error handling, and Link for redirection.

### Route Protection

- A Higher Order Component (HOC) named `WithAuth` is created to protect routes and check user authentication.

- JWT is stored in local storage for managing user sessions.

### Ethers.js Integration

- Ethers.js is used for connecting to the Metamask wallet and fetching the user's balance.

- Supported chains: **Ethereum** and **Avalanche**.

- If the user is on an unsupported chain, a wallet popup will appear to switch to an allowed chain.

### Styling

- **Tailwind CSS** is used for styling components.

### Real-Time Data

- **Socket.IO Client**: Used to receive real-time data from the backend and update the `UserContext` state for real-time updates. The connection is disconnected when the `Profile` component is unmounted.

### Running Frontend Tests

1. Navigate to the frontend directory:

```bash
   cd frontend
```

2. Install dependencies:

```bash
   npm install
```

3. Run the tests:

```bash
   npm run test
```

To see the tests visually:

```bash
npm run test:ui
```

This documentation should help you get started with setting up, running, and testing the project.
