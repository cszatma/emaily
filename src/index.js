// @flow

import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import chalk from 'chalk';

import authRoutes from './routes/authRoutes';
import billingRoutes from './routes/billingRoutes';
import keys from './config/keys';
import './models/User';
import './services/passport';
import dev from './utils/dev-utils';

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 = 30 days
        keys: [keys.cookieKey],
    }),
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

dev.log(chalk.green(`Server successfully started on port ${PORT}\n`));
