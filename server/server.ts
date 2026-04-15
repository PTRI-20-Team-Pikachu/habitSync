import express from 'express';
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

const __dirname = import.meta.dirname;
const PORT = 3434;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    /*
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:5175',
    ],
    */
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(deserializeUser as any);

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/habits', habitRouter);

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    const defaultError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.error(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  },
);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

// ── Authentication Routes ──────────────────────────────────────────────────────
console.log('Authentication API Routes:');
authRoutes(app as any);

export default app;
