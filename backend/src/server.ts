import express, { Router } from 'express';
import cors from 'cors';

import app from './app';

const app1 = express();
app1.use(cors());
app1.use(express.json());
app1.use(
  Router().get('/health-check', async (_, response) => {
    return response.json('OK');
  }),
);

app1.listen(10000, () => {
  console.log('🚀 Server started on port 10000!');
});

app.listen(443, () => {
  console.log('🚀 Server started on port 443!');
});
