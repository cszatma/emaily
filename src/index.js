// @flow

import express from 'express';
import mongoose from 'mongoose';

import './services/passport';
import authRoutes from './routes/authRoutes';
import keys from './config/keys';

mongoose.connect(keys.mongoURI);

const app = express();

authRoutes(app);

app.listen(process.env.PORT || 5000);
