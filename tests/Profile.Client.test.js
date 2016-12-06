jest.enableAutomock();
jest.dontMock('components/Client/Profile/Client');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('react-router');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Client');

describe('Test Client', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    const mount = Enzyme.mount;

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
                        ability: 200,
                        frequency: 10,
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

        mockAdapter.onGet(HOST + '/api/v1/client/' + id).reply(200, response);

        Client = require('components/Client/Profile/Client').default;

        component = mount(
            <Client params={ { id: id} }/>
        );

        setTimeout(() => {

            try {
                expect(component.find('.name p').at(0).text()).toEqual('Jon Snow');
                expect(component.find('.name p').at(1).text()).toEqual('Address: 7 Street - Winterfell');
                expect(component.find('.name p').at(2).text()).toEqual('Area: Center');
                expect(component.find('.followers p').at(0).text()).toEqual('10');
                expect(component.find('.followers p').at(1).text()).toEqual('Frequency');
                expect(component.find('.followers p').at(2).text()).toEqual('200');
                expect(component.find('.followers p').at(3).text()).toEqual('Ability');
                expect(component.find('.nav-menu span a').at(0).text()).toEqual('Visited');
                expect(component.find('.nav-menu span a').at(1).text()).toEqual('Update');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should show error message', (done) => {

        let id = '123abc';
        let response = { error:"Client Not Found" };
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/client/' + id).reply(404, response);

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

        mockAdapter.onGet(HOST + '/api/v1/client/' + id).reply(503, response);

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


