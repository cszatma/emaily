// @flow

import axios from 'axios';

import { fetchUserAction } from './actionTypes';
import type { ThunkAction, Dispatch } from 'actions';
import type { StripeToken } from 'redux-extensions';

export function fetchUser(): ThunkAction {
    return async (dispatch: Dispatch): any => {
        const res = await axios.get('/api/current_user');
        dispatch(fetchUserAction(res.data));
    };
}

export function handleToken(token: StripeToken): ThunkAction {
    return async (dispatch: Dispatch): any => {
        const res = await axios.post('/api/stripe', token);
        dispatch(fetchUserAction(res.data));
    };
}
