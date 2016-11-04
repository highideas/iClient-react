jest.enableAutomock();
jest.dontMock('components/Area/Area');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('../tests/__mocks__/AreasResponseMock');
jest.dontMock('enzyme');

var promise = {};

describe('Test Area', () => {
    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    let Visit = require('services/Visit').default;


    beforeEach((done) => {
        Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
            return promise;
        });
        done();
    });

    test('Area should show nothing if no data', () => {

        let error = {response:{data:{error:"Not Found"}}};

        let Visit = require('services/Visit').default;
        Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                throw error;
            });
        });

        let Area = require('components/Area/Area').default;

        const component = shallow(
            <Area />
        );
        component.setState({
            error: error.response.data.error
        });
        expect(component.state('error')).toEqual('Not Found');

        let errorComponent = shallow(
            component.instance().generateError(error.response.data.error)
        );

        expect(errorComponent.find('div').text()).toEqual('Not Found');
    });

    test('Area should show mocked data', () => {

        let response = {data:require('AreasResponseMock').default};

        promise = new Promise((resolve, reject) => {
            resolve(response);
        });

        let Area = require('components/Area/Area').default;

        const component = shallow(
            <Area />
        );
        component.setState({
            areas: component.instance().generate(response.data.visits)
        });
        expect(component.find('.title').at(0).text()).toEqual('Center');
        expect(component.find('.title').at(1).text()).toEqual('South');
    });

});
