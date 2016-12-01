jest.enableAutomock();
jest.dontMock('components/Visit/Create/Visit');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Visit');
jest.dontMock('services/Client');

describe('Test Create Visit', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    const mount = Enzyme.mount;
    const context = {
        router: {
            push: (arg) => arg
        }
    };

    let axios = require('axios');
    let MockAdapter = require('axios-mock-adapter');
    let response;

    beforeEach(() => {
        response = {
            client : [
                {
                    _id : '1',
                    updatedAt : '2016-12-01T12:26:00.903Z',
                    createdAt : '2016-12-01T12:26:00.903Z',
                    name : 'Test',
                    address : 'fdajla',
                    city : 'fdajlkj',
                    area : {
                        _id : 'Center',
                        parent : '',
                        __v : 0,
                        ancestors :[]
                    },
                    frequency : 11,
                    ability : 201,
                    __v :0
                }
            ]
        };
    });

    it('Visit should show error when fails to create visit', (done) => {

        let expectedClient = response.client[0];
        let Visit = require('components/Visit/Create/Visit').default;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => {
                    expect(arg).toEqual('/area');
                }
            }
        };
        let component = mount(
            <Visit params={ {clientId : 1} }/>,
            { context }
        );
        let expected = {
            client : expectedClient,
            visit_date : component.state().visit_date,
            value_received : '10',
            sales_quantity : '10',
        }

        mockAdapter
            .onGet(HOST + '/api/v1/client/1').reply(200, response)
            .onPost(HOST + '/api/v1/visit').reply(503, { error : 'Error on server'});

        setTimeout(() => {

            let inputs = {
                value_received : component.find('input').at(0),
                quantity : component.find('input').at(1),
            }

            for (let input in inputs) {
                inputs[input].node.value = 10;
                inputs[input].simulate('change', inputs[input]);
            }
            component.find('form').simulate('submit', { target: component.find('form').get(0) });

        }, 5);

        setTimeout(() => {

            try {
                expect(component.render().text()).toEqual('Error on server');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 10);
    });

    it('Should show error when fails to create visit', (done) => {

        let expectedClient = response.client[0];
        let Visit = require('components/Visit/Create/Visit').default;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => {
                    expect(arg).toEqual('/area');
                }
            }
        };
        let component = mount(
            <Visit params={ {clientId : 1} }/>,
            { context }
        );
        let expected = {
            client : expectedClient,
            visit_date : component.state().visit_date,
            value_received : '10',
            sales_quantity : '10',
        }

        mockAdapter
            .onGet(HOST + '/api/v1/client/1').reply(200, response)
            .onPost(HOST + '/api/v1/visit').reply(503);

        setTimeout(() => {

            let inputs = {
                value_received : component.find('input').at(0),
                quantity : component.find('input').at(1),
            }

            for (let input in inputs) {
                inputs[input].node.value = 10;
                inputs[input].simulate('change', inputs[input]);
            }
            component.find('form').simulate('submit', { target: component.find('form').get(0) });

        }, 5);

        setTimeout(() => {

            try {
                expect(component.render().text()).toEqual('Error trying create visit');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 10);
    });

    it('Should return data on submit', (done) => {

        let expectedClient = response.client[0];
        let Visit = require('components/Visit/Create/Visit').default;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => {
                    expect(arg).toEqual('/area');
                }
            }
        };
        let component = mount(
            <Visit params={ {clientId : 1} }/>,
            { context }
        );
        let expected = {
            client : expectedClient,
            visit_date : component.state().visit_date,
            value_received : '10',
            sales_quantity : '10',
        }

        mockAdapter
            .onGet(HOST + '/api/v1/client/1').reply(200, response)
            .onPost(HOST + '/api/v1/visit').reply(201);

        setTimeout(() => {

            try {

                let inputs = {
                    value_received : component.find('input').at(0),
                    quantity : component.find('input').at(1),
                }

                for (let input in inputs) {
                    inputs[input].node.value = 10;
                    inputs[input].simulate('change', inputs[input]);
                }
                component.find('form').simulate('submit', { target: component.find('form').get(0) });

                expect(component.state().client).toEqual(expectedClient);
                expect(component.state().visit).toEqual(expected);
                expect(component.state().error).toEqual('');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 25);
    });

    it('Should show mocked data', (done) => {

        let mockAdapter = new MockAdapter(axios);
        let Visit = require('components/Visit/Create/Visit').default;
        let component = shallow(
            <Visit params={ {clientId : 1} }/>,
            { context }
        );

        mockAdapter.onGet(HOST + '/api/v1/client/1').reply(200, response);

        setTimeout(() => {

            try {
                expect(component.find('.content p').at(0).text()).toEqual('Name: Test');
                expect(component.find('.content p').at(1).text()).toEqual('Address: fdajla');
                expect(component.find('.content p').at(2).text()).toEqual('City: fdajlkj');
                expect(component.find('.button').text()).toEqual('Save');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Should show error message', (done) => {

        let response = { error:'Client 1 Not Found' };
        let Visit = require('components/Visit/Create/Visit').default;
        let mockAdapter = new MockAdapter(axios);
        let component = shallow(
            <Visit params={ {clientId : 1} }/>,
            { context }
        );

        mockAdapter.onGet(HOST + '/api/v1/client/1').reply(404, response);

        setTimeout(() => {

            try {
                component.update();
                expect(component.render().text()).toEqual('Client 1 Not Found');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Should show default error message', (done) => {

        let mockAdapter = new MockAdapter(axios);
        let Visit = require('components/Visit/Create/Visit').default;
        let component = shallow(
            <Visit params={ {clientId : 1} }/>,
            { context }
        );

        mockAdapter.onGet(HOST + '/api/v1/client/1').reply(503);

        setTimeout(() => {

            try {
                expect(component.render().text()).toEqual('Error Found: Trying get client');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });
});

