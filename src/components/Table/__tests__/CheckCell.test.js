import React from 'react';

import {shallow} from 'enzyme';
import CheckCell from '../CheckCell';
import renderer from 'react-test-renderer';


describe('<CheckCell/> component', () => {

    it('renders correctly', () => {

        const fn = jest.fn();
        const tree = renderer.create(
            <CheckCell checked={true}
                       value={1} onChange={fn}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    })

});
