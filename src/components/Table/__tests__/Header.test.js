import React from 'react';
import {shallow} from 'enzyme';
import Header from '../Header';


describe('<TableHeader/> component', () => {
    const onAction = jest.fn();

    let header;
    let select;
    let button;

    beforeEach(() => {
        onAction.mockReset();
        header = shallow(
            <Header onAction={onAction}/>
        );
        select = header.find('select');
        button = header.find('input[type="submit"]');

    });

    it('should set action state after selecting dropdown', () => {

        select.simulate('change', {target: {value: 'delete'}});
        expect(header.state('action')).toEqual('delete');

    });

    it('should call onAction if no action set', () => {

        button.simulate('click');
        expect(onAction).not.toHaveBeenCalled()
    });
    it('should call onAction passing the correct action', () => {
        select.simulate('change', {target: {value: 'delete'}});
        button.simulate('click');
        expect(onAction).toHaveBeenCalledTimes(1);
        expect(onAction).toHaveBeenCalledWith('delete');
    })

});