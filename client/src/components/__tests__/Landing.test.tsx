import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Landing from '../Landing';

describe('Landing tests', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Landing />);
    });

    it('should render the component', () => {
        expect(wrapper).toHaveLength(1);
    });
});
