import mongoose from 'mongoose';
import passport from 'passport';
import PassportGoogleStrategy, { DoneCallback } from 'passport-google-oauth20';
import { UserModel } from '../models/User';

import keys from '../config/keys';

const GoogleStrategy = PassportGoogleStrategy.Strategy;
const User = mongoose.model('users');

passport.serializeUser((user: UserModel, done) => done(null, user.id));

passport.deserializeUser((id: string, done) =>
    User.findById(id).then(user => done(null, user!)),
);

passport.use(
    new GoogleStrategy(
        {
            callbackURL: '/auth/google/callback',
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            proxy: true,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: { id: string },
            done: DoneCallback,
        ) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        },
    ),
);
