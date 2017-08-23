import React from 'react';
import PropTypes from 'prop-types';
import {shallow, mount} from 'enzyme';
import {Table} from '../Table';
import configureStore from 'redux-mock-store';


describe('<Table/> component', () => {
    let table;
    const posts = () => {
        return [
            {
                id: 1,
                title: 'Hello',
                featured_media: 0
            },
            {
                id: 2,
                title: 'Hello 2',
                featured_media: 0
            }
        ]
    };

    const mockStore = configureStore();
    let store;

    beforeEach(() => {

        table = shallow(
            <Table posts={posts()}/>
        );


    });

    it('should select all checkboxes', () => {


        table.instance().onSelectAllToggle();

        expect(table.state('selected')).toEqual([1, 2]);

        expect(table.state('selectAll')).toBeTruthy();
        table.instance().onSelectAllToggle();
        expect(table.state('selected')).toHaveLength(0);
        expect(table.state('selectAll')).toBeFalsy();


    });


});