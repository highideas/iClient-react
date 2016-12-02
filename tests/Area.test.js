jest.enableAutomock();
jest.dontMock('components/Area/Area');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('services/Visit');
jest.dontMock('../tests/__mocks__/AreasResponseMock');
jest.dontMock('enzyme');

describe('Test Area', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    let axios = require('axios');
    let MockAdapter = require('axios-mock-adapter');
    let Visit = require('services/Visit').default;

    it('Area should show error message', (done) => {

        let response = {error:"Not Found"};
        let Area;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/visit/group/area').reply(404, response);

        Area = require('components/Area/Area').default;

        component = shallow(
            <Area />
        );

        setTimeout(() => {
            expect(component.render().text()).toEqual('Not Found');
            done();
        }, 0);
    });

    it('Area should show nothing if no data', (done) => {

        let Area;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/visit/group/area').reply(404, {});

        Area = require('components/Area/Area').default;

        component = shallow(
            <Area />
        );

        setTimeout(() => {
            expect(component.state('error')).toEqual('');
            done();
        }, 0);
    });

    it('Area should show mocked data', (done) => {

        let response = require('AreasResponseMock').default;
        let Area;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/visit/group/area').reply(200, response);

        Area = require('components/Area/Area').default;

        component = shallow(
            <Area />
        );

        setTimeout(() => {
            expect(
                shallow(
                    component.state().areas[0]
                ).find('.title').at(0).text()
            ).toEqual('Center');
            expect(
                shallow(
                    component.state().areas[1]
                ).find('.title').at(0).text()
            ).toEqual('South');
            done();
        }, 0);
    });

});
