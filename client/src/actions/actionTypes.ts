import { User, Survey } from 'models';

export interface Action {
    readonly type: string;
    readonly payload: any;
}

export interface FetchUserAction extends Action {
    readonly type: 'fetch_user';
    readonly payload: User;
}

export interface FetchSurveysAction extends Action {
    readonly type: 'fetch_surveys';
    readonly payload: Survey[];
}

export type Dispatch<A extends Action> = (action: A) => A;

export type ThunkAction<A extends Action> = (
    dispatch: Dispatch<A>,
) => Promise<A>;

export type AnyAction = FetchUserAction | FetchSurveysAction;

export const FETCH_USER = 'fetch_user';

export function fetchUserAction(payload: User): FetchUserAction {
    return { type: FETCH_USER, payload };
}

export const FETCH_SURVEYS = 'fetch_surveys';

export function fetchSurveysAction(payload: Survey[]): FetchSurveysAction {
    return { type: FETCH_SURVEYS, payload };
}
