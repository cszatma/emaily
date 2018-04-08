import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';

import ConnectedApp, { App } from '../App';

describe('App tests', () => {
    let wrapper;

    beforeEach(() => {
        const mockFetchUser = jest.fn();
        wrapper = shallow(<App fetchUser={mockFetchUser} />);
    });

    it('should render the component', () => {
        expect(wrapper).toHaveLength(1);
    });
});

describe('ConnectedApp tests', () => {
    const mockStore = configureStore([reduxThunk]);
    let wrapper;
    let store;

    beforeEach(() => {
        store = mockStore();
        wrapper = shallow(<ConnectedApp store={store} />);
    });

    it('should render the component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should have props.fetchUser props be a function', () => {
        expect(wrapper.prop('fetchUser')).toBeTruthy();
    });
});
