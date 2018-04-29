import passport from 'passport';

export * from 'passport-google-oauth';

export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    proxy: boolean;
}

export type DoneCallback = (error: any, user?: any, info?: any) => any;

export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: DoneCallback,
) => any;

export class Strategy extends passport.Strategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
}
