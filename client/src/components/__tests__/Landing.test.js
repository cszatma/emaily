import React from 'react';
import { shallow } from 'enzyme';

import Landing from '../Landing';

describe('Landing tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Landing />);
    });

    it('should render the component', () => {
        expect(wrapper).toHaveLength(1);
    });
});
