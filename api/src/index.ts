import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';

import { router } from './routes';

const app = express();

app.use(express.json());

function headerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl !== '/') {
    console.log(`${req.method} -> ${req.originalUrl}`);
  }

  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*',
  });

  next();
}

app.use(headerMiddleware);

app.use([router]);

app.listen(process.env.PORT ?? 3000, () => console.info('live on ::[' + (process.env.PORT ?? 3000) + ']'));
