import { User } from '../types/models';

export interface Action {
    readonly type: string;
    readonly payload: any;
}

export interface FetchUserAction extends Action {
    readonly type: 'fetch_user';
    readonly payload: User;
}

export type Dispatch<A extends Action> = (action: A) => A;

export type ThunkAction<A extends Action> = (
    dispatch: Dispatch<A>,
) => Promise<A>;

export type AnyAction = FetchUserAction;

export const FETCH_USER = 'fetch_user';

export function fetchUserAction(payload: User): FetchUserAction {
    return { type: FETCH_USER, payload };
}
