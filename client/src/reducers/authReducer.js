// @flow

import { FETCH_USER } from '../actions/actionTypes';
import type { Action } from 'actions';
import type { AuthState } from 'redux-extensions';

export default function(state: AuthState = null, action: Action): AuthState {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
