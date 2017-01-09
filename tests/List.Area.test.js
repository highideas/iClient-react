jest.enableAutomock();
jest.dontMock('components/Area/List/Area');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Area');

describe('Test Area', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;

    let axios = require('axios');
    let MockAdapter = require('axios-mock-adapter');

    it('Area should show error message', (done) => {

        let response = {error:"Area Not Found"};
        let Area;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/area').reply(404, response);

        Area = require('components/Area/List/Area').default;

        component = shallow(
            <Area />
        );

        setTimeout(() => {
            try {
                component.update();
                expect(component.render().text()).toEqual('Area Not Found');
                done();
            } catch (e) {
                console.log(e);
            }

        }, 0);
    });

    it('Area should show default error message', (done) => {

        let response = {};
        let Area;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/area').reply(503, response);

        Area = require('components/Area/List/Area').default;

        component = shallow(
            <Area />
        );

        setTimeout(() => {
            try {
                component.update();
                expect(component.render().text()).toEqual('Error Found: Trying get area');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 0);
    });

    it('Area should show mocked data', (done) => {

        let response = {
            areas: [
                {_id: 'South', parent: 'Center', ancestors: 'Center'},
                {_id: 'North', parent: 'Center', ancestors: 'Center'},
            ]
        };
        let Area;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/area').reply(200, response);

        Area = require('components/Area/List/Area').default;

        component = shallow(
            <Area />
        );

        setTimeout(() => {
            try {
                component.update();
                expect(component.find('tbody td').at(0).text()).toEqual('South');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 0);
    });

    it('Should show headers to stub json', (done) => {
        let response = {
            areas: [
                {_id: 'South', parent: 'Center', ancestors: 'Center'},
                {_id: 'North', parent: 'Center', ancestors: 'Center'},
            ]
        };
        let Area;
        let component;
        let mockAdapter = new MockAdapter(axios);
        jsonStubHeaders = '{ "JsonStub-User-Key": "user-key", "JsonStub-Project-Key": "project-key" }';

        mockAdapter.onGet(HOST + '/api/v1/area').reply(200, response);

        Area = require('components/Area/List/Area').default;

        component = shallow(
            <Area />
        );

        setTimeout(() => {
            try {
                component.update();
                expect(component.find('tbody td').at(0).text()).toEqual('South');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 0);
    });
});

