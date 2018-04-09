import authReducer from '../authReducer';
import { FETCH_USER } from '../../actions/actionTypes';

const initialState = null;
const user = {
    _id: 'abcdef',
    googleId: 'ghijkl',
    credits: 5,
};

describe('authReducer tests', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_USER', () => {
        expect(
            authReducer(undefined, { type: FETCH_USER, payload: user }),
        ).toEqual(user);
    });
});
