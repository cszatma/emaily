// @flow

import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';

import authRoutes from './routes/authRoutes';
import keys from './config/keys';
import './models/User';
import './services/passport';

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 = 30 days
        keys: [keys.cookieKey],
    }),
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.listen(process.env.PORT || 5000);
