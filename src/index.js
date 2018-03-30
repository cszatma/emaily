// @flow

import express from 'express';

import './services/passport';
import authRoutes from './routes/authRoutes';

const app = express();

authRoutes(app);

app.listen(process.env.PORT || 5000);
