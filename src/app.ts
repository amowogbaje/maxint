import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './auth/auth.routes';
import accountRoutes from './account/account.routes';

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', accountRoutes);

app.get("/", (req, res) => {
  return res.json({
    "message": "Welcome to the Account Feature API",
    "status": res.statusCode,
  });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!', details: err.message });
});

export default app;
