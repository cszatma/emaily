// @flow

declare module 'redux-extensions' {
    declare export type User = {
        +_id: string,
        +googleId: string,
    };

    declare export type AuthState = ?User | false;

    declare export type ReduxState = {
        auth: AuthState,
    };
}
