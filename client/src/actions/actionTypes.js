// @flow

import type { User } from 'redux-extensions';
import type { FetchUserAction } from 'actions';

export const FETCH_USER = 'fetch_user';

export function fetchUserAction(payload: User): FetchUserAction {
    return { type: FETCH_USER, payload };
}
