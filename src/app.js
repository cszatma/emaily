// @flow

import passport from 'passport/lib/index';
import bodyParser from 'body-parser';
import express from 'express';
import cookieSession from 'cookie-session';
import type { $Request, $Response } from 'express';

import keys from './config/keys';
import authRoutes from './routes/authRoutes';
import billingRoutes from './routes/billingRoutes';

const app = express();

// Setup global middlewares that all routes will use
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 = 30 days
        keys: [keys.cookieKey],
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// Setup route handlers
authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Express will server up production assets from the client
    app.use(express.static(path.resolve(__dirname, 'client')));

    // Express will serve up the index.html file if it doesn't recognize the route
    app.get('*', (req: $Request, res: $Response) => {
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
}

export default app;
