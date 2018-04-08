// @flow

declare module 'emaily-types' {
    import type { $Request } from 'express';

    declare export type UserModel = {
        id: string,
        googleId: string,
    };

    declare export type StripeToken = {
        card: Object,
        client_ip: string,
        created: number,
        email: string,
        id: string,
        livemode: boolean,
        object: string,
        type: string,
        used: boolean,
    };

    declare export type session$Request = $Request & {
        user: UserModel,
        logout: void => void,
    };

    declare export type billing$Request = $Request & {
        body: StripeToken,
    };

    declare export type DoneCallback = (?Error, any) => any;
}
