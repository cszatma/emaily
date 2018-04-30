import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import passport from 'passport';

import keys from './config/keys';
import authRoutes from './routes/authRoutes';
import billingRoutes from './routes/billingRoutes';
import surveyRoutes from './routes/surveyRoutes';

const app = express();

// Setup global middlewares that all routes will use
app.use(bodyParser.json());
app.use(
    cookieSession({
        keys: [keys.cookieKey],
        maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 = 30 days
        name: 'session',
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// Setup route handlers
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Express will server up production assets from the client
    app.use(express.static(path.resolve(__dirname, 'client')));

    // Express will serve up the index.html file if it doesn't recognize the route
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
}

export default app;
