// @flow

import passport from 'passport';
import type { $Application } from 'express';

export default (app: $Application) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        }),
    );

    app.get('/auth/google/callback', passport.authenticate('google'));
};
