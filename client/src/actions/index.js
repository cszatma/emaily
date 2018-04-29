// @flow

import axios from 'axios';
import type { RouterHistory } from 'react-router-dom';

import { fetchUserAction } from './actionTypes';
import type { ThunkAction, Dispatch } from 'actions';
import type { StripeToken } from 'redux-extensions';
import type { FormValues } from '../components/surveys/formFields';

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

export function submitSurvey(
    values: FormValues,
    history: RouterHistory,
): ThunkAction {
    return async (dispatch: Dispatch): any => {
        const res = await axios.post('/api/surveys', values);
        history.push('/surveys');
        dispatch(fetchUserAction(res.data));
    };
}
