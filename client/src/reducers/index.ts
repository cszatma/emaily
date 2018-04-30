import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer, { AuthState } from './authReducer';

export interface ReduxState {
    auth: AuthState;
}

export default combineReducers({
    auth: authReducer,
    form: formReducer,
});
