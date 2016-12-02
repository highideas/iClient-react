jest.enableAutomock();
jest.dontMock('components/Client/Save/Client');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Area');
jest.dontMock('services/Client');

describe('Test Save Client', () => {
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

    it('Client should show error when fails to save client', (done) => {

        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => arg
            }
        };
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onPost(HOST + '/api/v1/client').reply(503);

        Client = require('components/Client/Save/Client').default;

        component = mount(
            <Client />,
            { context }
        );

        setTimeout(() => {

            let inputs = {
                name : component.find('input').at(0),
                phone : component.find('input').at(1),
                address : component.find('input').at(2),
                city : component.find('input').at(3),
                frequency : component.find('input').at(4),
                ability : component.find('input').at(5),
            }

            for (let input in inputs) {
                inputs[input].node.value = input;
                inputs[input].simulate('change', input);
            }
            component.find('form').simulate('submit', { target: component.find('form').get(0) });
        }, 5);

        setTimeout(() => {

            try {
                expect(component.render().text()).toEqual('Error trying save client');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 10);
    });


    it('Client should show error when fails to save client', (done) => {

        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => arg
            }
        };
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onPost(HOST + '/api/v1/client').reply(503, {error : 'Error save client'} );

        Client = require('components/Client/Save/Client').default;

        component = mount(
            <Client />,
            { context }
        );

        setTimeout(() => {

            let inputs = {
                name : component.find('input').at(0),
                phone : component.find('input').at(1),
                address : component.find('input').at(2),
                city : component.find('input').at(3),
                frequency : component.find('input').at(4),
                ability : component.find('input').at(5),
            }

            for (let input in inputs) {
                inputs[input].node.value = input;
                inputs[input].simulate('change', input);
            }
            component.find('form').simulate('submit', { target: component.find('form').get(0) });
        }, 5);

        setTimeout(() => {

            try {
                expect(component.render().text()).toEqual('Error save client');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 10);
    });

    it('Client should return data on submit', (done) => {

        let Client;
        let component;
        let selectArea;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => {
                    expect(arg).toEqual('/clients');
                }
            }
        };
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };
        let expected = {
            name : 'name',
            phone : 'phone',
            address : 'address',
            city : 'city',
            frequency : 'frequency',
            ability : 'ability',
            area : {
                _id : "Center",
                parent : "",
                __v : 0,
                ancestors : []
            },
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onPost(HOST + '/api/v1/client').reply(201);

        Client = require('components/Client/Save/Client').default;

        component = mount(
            <Client />,
            { context }
        );

        setTimeout(() => {

            try {

                let inputs = {
                    name : component.find('input').at(0),
                    phone : component.find('input').at(1),
                    address : component.find('input').at(2),
                    city : component.find('input').at(3),
                    frequency : component.find('input').at(4),
                    ability : component.find('input').at(5),
                }

                selectArea = component.find('select')
                selectArea.node.value = 'Center'
                selectArea.simulate('change', selectArea);

                for (let input in inputs) {
                    inputs[input].node.value = input;
                    inputs[input].simulate('change', input);
                }
                component.find('form').simulate('submit', { target: component.find('form').get(0) });
                expect(component.state().client).toEqual(expected);
                expect(component.state().error).toEqual('');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should show mocked areas data', (done) => {

        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/area').reply(200, response);

        Client = require('components/Client/Save/Client').default;

        component = shallow(
            <Client />,
            { context }
        );

        setTimeout(() => {

            expect(component.find('select option').at(0).text()).toEqual('Center');
            expect(component.find('select option').at(1).text()).toEqual('South');
            done();
        }, 0);
    });

    it('Client should show error message', (done) => {

        let response = { error:"Areas Not Found" };
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/area').reply(404, response);

        Client = require('components/Client/Save/Client').default;

        component = shallow(
            <Client />,
            { context }
        );

        setTimeout(() => {

            component.update();
            expect(component.render().text()).toEqual('Areas Not Found');
            done();
        }, 0);
    });

    it('Client should show default error message', (done) => {

        let response = {};
        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onGet(HOST + '/api/v1/area').reply(503, response);

        Client = require('components/Client/Save/Client').default;

        component = shallow(
            <Client />,
            { context }
        );

        setTimeout(() => {

            try {
                component.update();
                expect(component.render().text()).toEqual('Error Found: Trying get areas');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should show client loaded', (done) => {

        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };
        let clientResponse = {
            client : [
                {
                    _id : "58407735f7b50400132d64e7",
                    updatedAt : "2016-12-01T19:17:09.262Z",
                    createdAt : "2016-12-01T19:17:09.262Z",
                    name : "lfdjal",
                    address : "fdjaljfdal",
                    city : "jfladkjl", 
                    area : {
                        _id : "Test",
                        parent : "South",
                        __v : 0,
                        ancestors : []
                    },
                    frequency : 11, 
                    ability : 300,
                    __v : 0
                }
            ]
        };
        let expectedClientState = Object.assign({}, ...clientResponse.client);
        expectedClientState.updatedAt = '';
        expectedClientState.createdAt = '';
        expectedClientState.area = 'Test';

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onGet(HOST + '/api/v1/client/1').reply(200, clientResponse)

        Client = require('components/Client/Save/Client').default;

        component = shallow(
            <Client params={ { id: 1} }/>,
            { context }
        );

        setTimeout(() => {

            try {
                component.update();
                expect(component.state().client).toEqual(expectedClientState);
                expect(component.find('input').at(0).props().value).toEqual('lfdjal');
                expect(component.find('input').at(1).props().value).toEqual(undefined);
                expect(component.find('input').at(3).props().value).toEqual('jfladkjl');
                expect(component.find('input').at(4).props().value).toEqual(11);
                expect(component.find('input').at(5).props().value).toEqual(300);
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should show error message', (done) => {

        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onGet(HOST + '/api/v1/client/1').reply(503, { error : 'Error on server'})

        Client = require('components/Client/Save/Client').default;

        component = shallow(
            <Client params={ { id: 1} }/>,
            { context }
        );

        setTimeout(() => {

            try {
                component.update();
                expect(component.render().text()).toEqual('Error on server');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should show default error message when error to find client', (done) => {

        let Client;
        let component;
        let mockAdapter = new MockAdapter(axios);
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onGet(HOST + '/api/v1/client/1').reply(503);

        Client = require('components/Client/Save/Client').default;

        component = shallow(
            <Client params={ { id: 1} }/>,
            { context }
        );

        setTimeout(() => {

            try {
                component.update();
                expect(component.render().text()).toEqual('Error Found: Trying get client 1');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Client should update client', (done) => {

        let Client;
        let component;
        let selectArea;
        let mockAdapter = new MockAdapter(axios);
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };
        let clientResponse = {
            client : [
                {
                    _id : "58407735f7b50400132d64e7",
                    updatedAt : "2016-12-01T19:17:09.262Z",
                    createdAt : "2016-12-01T19:17:09.262Z",
                    name : "lfdjal",
                    address : "fdjaljfdal",
                    city : "jfladkjl", 
                    area : {
                        _id : "Test",
                        parent : "South",
                        __v : 0,
                        ancestors : []
                    },
                    frequency : 11, 
                    ability : 300,
                    __v : 0
                }
            ]
        };
        let expectedClientState = Object.assign({}, ...clientResponse.client);
        expectedClientState.updatedAt = '';
        expectedClientState.createdAt = '';
        expectedClientState.area = {
            _id : "Center",
            parent : "",
            __v : 0,
            ancestors : []
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onGet(HOST + '/api/v1/client/1').reply(200, clientResponse)
            .onPost(HOST + '/api/v1/client').reply(403)
            .onPut(HOST + '/api/v1/client').reply(204)

        Client = require('components/Client/Save/Client').default;

        component = mount(
            <Client params={ { id: 1} }/>,
            { context }
        );

        setTimeout(() => {

            try {

                selectArea = component.find('select')
                selectArea.node.value = 'Center'
                selectArea.simulate('change', selectArea);

                component.find('form').simulate('submit', { target: component.find('form').get(0) });

                component.update();
                expect(component.state().error).toEqual('');
                expect(component.state().client).toEqual(expectedClientState);
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });
});

