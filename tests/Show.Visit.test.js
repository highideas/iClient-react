jest.enableAutomock();
jest.dontMock('components/Visit/Show/Visit');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('react-router');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Visit');
jest.dontMock('helpers/Date');

describe('Test Visit', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    const mount = Enzyme.mount;

    let axios = require('axios');
    let MockAdapter = require('axios-mock-adapter');

    it('Visit should show mocked data', (done) => {

        let id = '123abc';
        let response = {
                visit: [{
                        visit_date: "2017-10-01",
                        value_received: 300,
                        sales_quantity: 150,
                        client: {
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
                    }]
        };
        let Visit;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/visit/' + id).reply(200, response);

        Visit = require('components/Visit/Show/Visit').default;

        component = mount(
            <Visit params={ { id: id} }/>
        );

        setTimeout(() => {

            try {
                expect(component.find('.name p').at(0).text()).toEqual('Visit Date: Sun, 01 Oct 2017 00:00:00 GMT');
                expect(component.find('.name p').at(1).text()).toEqual('Address: 7 Street');
                expect(component.find('.name p').at(2).text()).toEqual('Area: Center');
                expect(component.find('.followers p').at(0).text()).toEqual('R$ 300');
                expect(component.find('.followers p').at(1).text()).toEqual('Value Received');
                expect(component.find('.likes p').at(0).text()).toEqual('150');
                expect(component.find('.likes p').at(1).text()).toEqual('Sales Quantity');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Visit should show error message', (done) => {

        let id = '123abc';
        let response = { error:"Visit Not Found" };
        let Visit;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/visit/' + id).reply(404, response);

        Visit = require('components/Visit/Show/Visit').default;

        component = shallow(
            <Visit params={ { id: id} }/>
        );

        setTimeout(() => {

            try {
                component.update();
                expect(component.render().text()).toEqual('Visit Not Found');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Visit should show default error message', (done) => {

        let id = '123abc';
        let response = {};
        let Visit;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/visit/' + id).reply(503, response);

        Visit = require('components/Visit/Show/Visit').default;

        component = shallow(
            <Visit params={ { id: id} }/>
        );

        setTimeout(() => {
            try {
                component.update();
                expect(component.render().text()).toEqual('Error Found: Trying get visit');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

});


