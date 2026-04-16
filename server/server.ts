import express from 'express';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import habitRouter from './routers/habitRouter.ts';
import authRoutes from './authentication/src/routes';
import deserializeUser from './authentication/src/middleware/deserializeUser';

/*
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  }),
);
*/
import userRouter from './routers/userRouter.ts';

const __dirname = import.meta.dirname;
const PORT = 3434;
const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3434'], // Vite dev server
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(deserializeUser as any);

// ── Routes ──────────────────────────────────────────────────────────────────
// app.use('/user', userRouter)
app.use('/habits-api', habitRouter); // I consider this change important because there are too many variables named habits.

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/{*splat}', (req, res) => {
  const filePath = path.join(__dirname, '../', 'index.html');
  res.status(200).sendFile(filePath);
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

// ── Authentication Routes ──────────────────────────────────────────────────────
console.log('Authentication API Routes:');
authRoutes(app as any);

export default app;
