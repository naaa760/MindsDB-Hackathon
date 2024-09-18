import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { connectToMongoDB, disconnectFromMongoDB } from './config/mongooseConnection';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
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

app.use(cors(corsOptions));

// Connect to MongoDB when the app starts
(async () => {
  try {
    await connectToMongoDB();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the DB connection fails
  }
})();

// Swagger configuration options
const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HealthPulse API',
      version: '1.0.0',
      description: 'API documentation for the HealthPulse project',
      contact: {
        name: 'Halleluyah Oludele',
        email: 'halleluyaholudele@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://healthpulse-hbaq.onrender.com'
      }
    ],
  },
  apis: ['./routes/*.ts'], // Path to your route files
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve Swagger API docs on the /api-docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Home route to display a message with a link to the API docs
app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h1>Welcome to Health Dashboard API</h1><p>View API documentation at <a href="/api-docs">/api-docs</a></p>'
  );
});

// Define routes
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
