import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';

import authReducer, { AuthState } from './authReducer';

export interface ReduxState {
    auth: AuthState;
    form: FormStateMap;
}

export default combineReducers({
    auth: authReducer,
    form: formReducer,
});

export { AuthState };
