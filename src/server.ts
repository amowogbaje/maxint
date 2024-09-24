import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from './app'; // Your Express app
import sequelize from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    
    // Start the server only when not running in a serverless environment
    if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Define the serverless handler
export const handler = serverless(app);

// Start the server for local development
startServer();
