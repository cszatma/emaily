import passport from 'passport';
import PassportGoogleStrategy from 'passport-google-oauth20';

import keys from '../config/keys';

const GoogleStrategy = PassportGoogleStrategy.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
        },
    ),
);
