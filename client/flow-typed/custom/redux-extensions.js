// @flow

declare module 'redux-extensions' {
    declare export type User = {
        +_id: string,
        +googleId: string,
        +credits: number,
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

    declare export type AuthState = ?User | false;

    declare export type ReduxState = {
        auth: AuthState,
    };
}
