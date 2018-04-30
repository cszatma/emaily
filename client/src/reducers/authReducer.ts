import { FETCH_USER, AnyAction } from '../actions/actionTypes';

import { User } from '../types/models';
import { Nullable } from '../types/aliases';

export type AuthState = Nullable<User> | false;

export default function(state: AuthState = null, action: AnyAction): AuthState {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
