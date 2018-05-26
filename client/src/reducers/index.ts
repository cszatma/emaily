import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';

import authReducer, { AuthState } from './authReducer';
import surveysReducer, { SurveyState } from './surveysReducer';

export interface ReduxState {
    auth: AuthState;
    form: FormStateMap;
    surveys: SurveyState;
}

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    surveys: surveysReducer,
});

export { AuthState };
