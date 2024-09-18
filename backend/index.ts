import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import { connectToMongoDB, disconnectFromMongoDB } from './config/mongooseConnection';
import healthReportRouter from './routes/reportsRoute';
import dotenv from 'dotenv';
import healthDashboardRouter from './routes/healthDashboardData';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure the Middleware to allow from all origins
const corsOptions: CorsOptions = {
  origin: "*", // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

app.use(cors(corsOptions)); // Proper CORS middleware setup

// Connect to MongoDB when the app starts
(async () => {
  try {
    await connectToMongoDB();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the DB connection fails
  }
})();

// Define routes
// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the HealthPulseAPI');
});

// Route to get the health report
app.use('/api', healthReportRouter);

// Route to get the health dashboard data
app.use('/api', healthDashboardRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

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
