// @flow

declare module 'actions' {
    import type { User } from 'redux-extensions';

    declare type FetchUserAction = {
        +type: 'fetch_user',
        payload: User,
    };

    declare export type Action = FetchUserAction;
    declare export type ThunkAction = (dispatch: Dispatch) => any;
    declare export type AnyAction = Action | ThunkAction;
    declare export type Dispatch = (action: AnyAction) => any;
}
