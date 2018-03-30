// @flow

import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import keys from './config/keys';
import './services/passport';
import './models/User';

mongoose.connect(keys.mongoURI);

const app = express();

authRoutes(app);

app.listen(process.env.PORT || 5000);
