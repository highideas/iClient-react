import React from 'react'
import {shallow} from 'enzyme';

import Error from 'components/Error/Error'

test('Error should show null if no error', () => {
    const errorComponent = shallow(
        <Error />
    );

    expect(errorComponent.text()).toEqual('');
});

test('Error should show error if error pass', () => {
    const errorMessage = 'Error found';
    const errorComponent = shallow(
        <Error error={errorMessage} />
    );

    expect(errorComponent.text()).toEqual('Error found');
});
