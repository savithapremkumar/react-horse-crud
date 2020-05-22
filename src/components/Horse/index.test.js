import React from 'react';
import { shallow } from 'enzyme';
import Horse from './index';

// Use array destructurig to create mock functions.
const [handleSubmit, handleChange, onCancelClick] = new Array(3).fill(jest.fn());

function shallowSetup() {
    // Sample props to pass to our shallow render
    const props = {
        display: true,
        name: 'testhorse',
        food: 'apple',
        height: '120',
        weight: '150',
        readOnly: 'true',
        handleSubmit,
        handleChange,
        onCancelClick
    };
    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<Horse {...props} />);

    return {
        props,
        enzymeWrapper,
    };
}

describe('Shallow rendered Horse', () => {
    it('should render a horse component with the details', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup();
        const input = enzymeWrapper.find('input');
        console.log(enzymeWrapper.debug());

        // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector. 
        expect(enzymeWrapper.find('[name="name"]')).toHaveLength(1);
        expect(enzymeWrapper.find('[name="food"]').prop('value')).toEqual('apple')
        expect(enzymeWrapper.find('[name="height"]').prop('value')).toEqual('120')
        expect(enzymeWrapper.find('[name="weight"]').prop('value')).toEqual('150')
        expect(enzymeWrapper.find('[name="height"]').prop('readOnly')).toBe('true')
    });
});

//TODO : To write tests to determine if the horse component's buttons and actions work properly

// describe('Editing shallow rendered Horse', () => {
  
// });