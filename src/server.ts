import dotenv from 'dotenv';
dotenv.config();

import serverless from 'serverless-http';
import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Only start the server if not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  startServer();
}

export const handler = serverless(app);
