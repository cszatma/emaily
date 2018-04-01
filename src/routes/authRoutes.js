// @flow

import passport from 'passport';
import type { $Application, $Response } from 'express';
import type { session$Request } from '../utils/types';

export default (app: $Application) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        }),
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req: session$Request, res: $Response) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req: session$Request, res: $Response) => {
        res.send(req.user);
    });
};
