import * as types from '../actionTypes';

const user = {
    _id: 'abcdef',
    googleId: 'ghijkl',
    credits: 5,
};

describe('action types tests', () => {
    it('should return a fetch user action object', () => {
        const expectedAction = { type: types.FETCH_USER, payload: user };

        expect(types.fetchUserAction(user)).toEqual(expectedAction);
    });
});
