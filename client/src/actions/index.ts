import axios from 'axios';
import { History } from 'history';

import {
    Dispatch,
    fetchUserAction,
    FetchUserAction,
    ThunkAction,
} from './actionTypes';
import { StripeToken } from '../types/models';
import { FormValues } from '../components/surveys/formFields';

export function fetchUser(): ThunkAction<FetchUserAction> {
    return async (
        dispatch: Dispatch<FetchUserAction>,
    ): Promise<FetchUserAction> => {
        const res = await axios.get('/api/current_user');
        return dispatch(fetchUserAction(res.data));
    };
}

export function handleToken(token: StripeToken): ThunkAction<FetchUserAction> {
    return async (
        dispatch: Dispatch<FetchUserAction>,
    ): Promise<FetchUserAction> => {
        const res = await axios.post('/api/stripe', token);
        return dispatch(fetchUserAction(res.data));
    };
}

export function submitSurvey(
    values: FormValues,
    history: History,
): ThunkAction<FetchUserAction> {
    return async (
        dispatch: Dispatch<FetchUserAction>,
    ): Promise<FetchUserAction> => {
        const res = await axios.post('/api/surveys', values);
        history.push('/surveys');
        return dispatch(fetchUserAction(res.data));
    };
}
