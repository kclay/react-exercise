import React from 'react';
import PropTypes from 'prop-types';
import {shallow, mount} from 'enzyme';
import {UnconnectedTable} from '../Table';
import configureStore from 'redux-mock-store';


describe('<Table/> component', () => {

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


    it('should select all checkboxes', () => {

        const table = shallow(
            <UnconnectedTable posts={posts()}/>
        );
        table.instance().onSelectAllToggle(true);

        expect(table.state('selected')).toEqual([1, 2]);
        table.instance().onSelectAllToggle(false);
        expect(table.state('selected')).toHaveLength(0);

    });
    it('should confirm that items are selected before deleting', () => {
        const table = shallow(
            <UnconnectedTable posts={posts()}/>
        );

        const fn = global.alert = jest.fn();

        table.instance().onDeletePosts();
        expect(fn).toBeCalled();


    })


    it('should abort deleting', () => {
        const deletePosts = jest.fn();
        const actions = {deletePosts};
        const table = shallow(
            <UnconnectedTable posts={posts()} actions={actions}/>
        );
        table.instance().onSelectAllToggle(true);
        const confirm = global.confirm = jest.fn();
        confirm.mockReturnValueOnce(false);
        expect(deletePosts).not.toBeCalled();

    })
    it('should call delete post action', () => {

        const deletePosts = jest.fn();
        const actions = {deletePosts};
        const table = shallow(
            <UnconnectedTable posts={posts()} actions={actions}/>
        );
        table.instance().onSelectAllToggle(true);
        const confirm = global.confirm = jest.fn();
        confirm.mockReturnValueOnce(true);
        global.alert = jest.fn();
        table.instance().onDeletePosts();


    })


});