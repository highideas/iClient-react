jest.enableAutomock();
jest.dontMock('components/Client/Profile/Client');
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

    it('Client should show mocked data', (done) => {

        let id = '123abc';
        let response = {
                client: [
                    {
                        id: id,
                        name: 'Jon Snow',
                        address: '7 Street',
                        city: 'Winterfell',
                        area: {
                            _id: 'Center',
                            parents: 'Center'
                        }
                    },
                ]
        };
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet('http://localhost:3000/api/v1/client/' + id).reply(200, response);

        Client = require('components/Client/Profile/Client').default;

        component = shallow(
            <Client params={ { id: id} }/>
        );

        setTimeout(() => {

            expect(component.find('.name p').at(0).text()).toEqual('Jon Snow');
            expect(component.find('.name p').at(1).text()).toEqual('7 Street');
            expect(component.find('.name p').at(2).text()).toEqual('Winterfell');
            expect(component.find('.followers p').at(0).text()).toEqual('Area');
            expect(component.find('.followers p').at(1).text()).toEqual('Center');
            expect(component.find('.nav-menu span a').at(0).text()).toEqual('Visited');
            expect(component.find('.nav-menu span a').at(1).text()).toEqual('Update');
            expect(component.find('.nav-menu span a').at(2).text()).toEqual('Schedule');
            expect(component.find('.nav-menu span a').at(3).text()).toEqual('Delete');
            done();
        }, 0);
    });

    it('Client should show error message', (done) => {

        let id = '123abc';
        let response = { error:"Client Not Found" };
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet('http://localhost:3000/api/v1/client/' + id).reply(404, response);

        Client = require('components/Client/Profile/Client').default;

        component = shallow(
            <Client params={ { id: id} }/>
        );

        setTimeout(() => {

            component.update();
            expect(component.render().text()).toEqual('Client Not Found');
            done();
        }, 0);
    });

    it('Client should show default error message', (done) => {

        let id = '123abc';
        let response = {};
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet('http://localhost:3000/api/v1/client/' + id).reply(503, response);

        Client = require('components/Client/Profile/Client').default;

        component = shallow(
            <Client params={ { id: id} }/>
        );

        setTimeout(() => {

            component.update();
            expect(component.render().text()).toEqual('Error Found: Trying get client');
            done();
        }, 0);
    });

});

