// @flow

import axios from 'axios';

import { FETCH_USER } from './actionTypes';
import type { ThunkAction, Dispatch } from 'actions';

export const fetchUser = (): ThunkAction => async (dispatch: Dispatch): any => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};
