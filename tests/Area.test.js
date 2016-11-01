jest.enableAutomock();
jest.dontMock('components/Area/Area');
jest.dontMock('react');
jest.dontMock('enzyme');
jest.dontMock('axios');
jest.dontMock('../tests/__mocks__/AreasResponseMock');

var React = require('react');
var Enzyme = require('enzyme');
var shallow = Enzyme.shallow;

test('Area should show nothing if no data', () => {
    let response = {data:{visits:''}};

    let Visit = require('services/Visit').default;
    Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            process.nextTick(
                () => resolve(response)
            );
        });
    });

    let Area = require('components/Area/Area').default;

    const component = shallow(
        <Area />
    );


    expect(component.text()).toEqual('');
});

test('Area should show mocked data', () => {

    let response = {data:require('AreasResponseMock').default};

    let Visit = require('services/Visit').default;
    Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
        return new Promise((resolve, reject) => {
            console.log(response.data.visits);
            process.nextTick(
                () => resolve(response)
            );
        });
    });

    let Area = require('components/Area/Area').default;

    const component = shallow(
        <Area />
    );


    expect(component.text()).toEqual('');
});


