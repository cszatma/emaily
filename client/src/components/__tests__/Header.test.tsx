import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureStore from 'redux-mock-store';

import ConnectedHeader, { Header } from '../Header';

describe('Header tests', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Header auth={false} />);
    });

    it('should render the component', () => {
        expect(wrapper).toHaveLength(1);
    });
});

describe('ConnectedHeader tests', () => {
    const mockStore = configureStore();
    const initialState = { auth: false };
    let wrapper: ShallowWrapper;
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
        // @ts-ignore
        wrapper = shallow(<ConnectedHeader store={store} />);
    });

    it('should render the component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should have prop auth equal to initialState.auth', () => {
        expect(wrapper.prop('auth')).toEqual(initialState.auth);
    });
});
