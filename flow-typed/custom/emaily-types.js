// @flow

declare module 'emaily-types' {
    import type { $Request } from 'express';

    declare export type UserModel = {
        id: string,
        googleId: string,
        credits: number,
        save: () => UserModel,
    };

    declare export type SurveyModel = {
        id: string,
        title: string,
        body: string,
        subject: string,
        yes: number,
        no: number,
        _user: any,
        dateSent: Date,
        lastResponded: Date,
    };

    declare export type RecipientModel = {
        email: string,
        responded: boolean,
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

    declare export type billing$Request = session$Request & {
        body: StripeToken,
    };

    declare export type survey$Request = session$Request & {
        body: {
            title: string,
            subject: string,
            body: string,
            recipients: string,
        },
    };

    declare export type DoneCallback = (
        error: ?Error,
        user: any,
        info: any,
    ) => any;
}
