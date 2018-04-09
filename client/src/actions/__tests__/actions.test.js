import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { fetchUser } from '../index';
import * as types from '../actionTypes';

const mockStore = configureStore([reduxThunk]);
const mockAxios = new MockAdapter(axios);

const user = {
    _id: 'abcdef',
    googleId: 'ghijkl',
    credits: 5,
};

mockAxios.onGet('/api/current_user').reply(200, user);

describe('action tests', () => {
    const initialState = null;
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('should dispatch FETCH_USER', () => {
        const expectedActions = [{ type: types.FETCH_USER, payload: user }];

        return store.dispatch(fetchUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
