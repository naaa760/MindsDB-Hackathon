import express from 'express';
import { connectToMongoDB, disconnectFromMongoDB } from './config/mongooseConnection';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB when the app starts
(async () => {
  try {
    await connectToMongoDB();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the DB connection fails
  }
})();

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the HealthPulseAPI');
});

// Start the server
const server = app.listen(port, () => console.log(`App listening on port ${port}`));

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down server...');
  server.close(async () => {
    await disconnectFromMongoDB();
    console.log('Server and MongoDB connection closed');
    process.exit(0); // Exit gracefully
  });
};

// Handle termination signals (e.g., Ctrl+C)
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
