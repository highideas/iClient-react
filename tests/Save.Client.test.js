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

    it('Client should show error when fails to create client', (done) => {

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
                expect(component.render().text()).toEqual('Error trying create client');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 10);
    });


    it('Client should show error when fails to create client', (done) => {

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
            .onPost(HOST + '/api/v1/client').reply(503, {error : 'Error create client'} );

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
                expect(component.render().text()).toEqual('Error create client');
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

});

