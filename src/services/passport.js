// @flow

import passport from 'passport';
import PassportGoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';

import keys from '../config/keys';
import type { UserModel, DoneCallback } from '../utils/types';

const GoogleStrategy = PassportGoogleStrategy.Strategy;
const User = mongoose.model('users');

passport.serializeUser((user: UserModel, done: DoneCallback) =>
    done(null, user.id),
);

passport.deserializeUser((id: string, done: DoneCallback) =>
    User.findById(id).then(user => done(null, user)),
);

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (
            accessToken: string,
            refreshToken: string,
            profile: { id: string },
            done: DoneCallback,
        ) => {
            User.findOne({ googleId: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({ googleId: profile.id })
                            .save()
                            .then(user => done(null, user))
                            .catch(error => console.log(error));
                    }
                })
                .catch(error => console.log(error));
        },
    ),
);
