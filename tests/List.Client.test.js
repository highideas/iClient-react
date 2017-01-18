jest.enableAutomock();
jest.dontMock('components/Client/List/Client');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Client');

describe('Test Client', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;

    let axios = require('axios');
    let MockAdapter = require('axios-mock-adapter');

    it('Client should show error message', (done) => {

        let response = {error:"Client Not Found"};
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/client').reply(404, response);

        Client = require('components/Client/List/Client').default;

        component = shallow(
            <Client />
        );

        setTimeout(() => {
            try {
                component.update();
                expect(component.render().find('.is-danger').text()).toEqual('Client Not Found');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should show default error message', (done) => {

        let response = {};
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/client').reply(503, response);

        Client = require('components/Client/List/Client').default;

        component = shallow(
            <Client />
        );

        setTimeout(() => {
            try {
                component.update();
                expect(component.render().find('.is-danger').text()).toEqual('Error Found: Trying get client');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should show mocked data', (done) => {

        let response = {
            clients: [
                {name: 'Jon Snow', address: '7 Street', city: 'Winterfell'},
                {name: 'Cotter Pyke', address: '0 Street', city: 'Castle Black'},
            ]
        };
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/client').reply(200, response);

        Client = require('components/Client/List/Client').default;

        component = shallow(
            <Client />
        );

        setTimeout(() => {
            component.update();
            expect(component.find('tbody td').at(0).text()).toEqual('Jon Snow');
            expect(component.find('tbody td').at(1).text()).toEqual('7 Street - Winterfell');
            done();
        }, 0);
    });

    it('Should show headers to stub json', (done) => {

        let response = {
            clients: [
                {name: 'Jon Snow', address: '7 Street', city: 'Winterfell'},
                {name: 'Cotter Pyke', address: '0 Street', city: 'Castle Black'},
            ]
        };
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);
        jsonStubHeaders = '{ "JsonStub-User-Key": "user-key", "JsonStub-Project-Key": "project-key" }';

        mockAdapter.onGet(HOST + '/api/v1/client').reply(200, response);

        Client = require('components/Client/List/Client').default;

        component = shallow(
            <Client />
        );

        setTimeout(() => {
            component.update();
            expect(component.find('tbody td').at(0).text()).toEqual('Jon Snow');
            expect(component.find('tbody td').at(1).text()).toEqual('7 Street - Winterfell');
            done();
        }, 0);
    });

});

