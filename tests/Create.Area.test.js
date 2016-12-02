jest.enableAutomock();
jest.dontMock('components/Area/Create/Area');
jest.dontMock('components/Area/Select/Area');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Area');

describe('Test Create Area', () => {
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

    it('Should show default error when fails to create area', (done) => {

        let areaInput;
        let areaSelected;
        let Area = require('components/Area/Create/Area').default;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => {
                    expect(arg).toEqual('/clients');
                }
            }
        };
        let component = mount(
            <Area />,
            { context }
        );
        let expected = {
            _id : 'Test',
            parent : 'South',
        }
        let response = {
            areas : [
                {
                    _id : "Center",
                },
                {
                    _id : "South",
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onPost(HOST + '/api/v1/area').reply(503, { error : 'Error on server'})

        setTimeout(() => {

            try {

                let inputs = {
                    area : component.find('input'),
                    parent : component.find('select'),
                }

                areaInput = component.find('input');
                areaInput.node.value = 'Test';
                areaInput.simulate('change', areaInput);

                areaSelected = component.find('select');
                areaSelected.node.value = 'South';
                areaSelected.simulate('change', areaSelected);

                component.find('form').simulate('submit', { target: component.find('form').get(0) });
            } catch (e) {
                console.log(e);
            }
        }, 5);


        setTimeout(() => {

            try {

                expect(component.state().area).toEqual(expected);
                expect(component.state().error).toEqual('Error on server');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 25);
    });

    it('Should show default error when fails to create area', (done) => {

        let areaInput;
        let areaSelected;
        let Area = require('components/Area/Create/Area').default;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => {
                    expect(arg).toEqual('/clients');
                }
            }
        };
        let component = mount(
            <Area />,
            { context }
        );
        let expected = {
            _id : 'Test',
            parent : 'South',
        }
        let response = {
            areas : [
                {
                    _id : "Center",
                },
                {
                    _id : "South",
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onPost(HOST + '/api/v1/area').reply(503)

        setTimeout(() => {

            try {

                let inputs = {
                    area : component.find('input'),
                    parent : component.find('select'),
                }

                areaInput = component.find('input');
                areaInput.node.value = 'Test';
                areaInput.simulate('change', areaInput);

                areaSelected = component.find('select');
                areaSelected.node.value = 'South';
                areaSelected.simulate('change', areaSelected);

                component.find('form').simulate('submit', { target: component.find('form').get(0) });
            } catch (e) {
                console.log(e);
            }
        }, 5);


        setTimeout(() => {

            try {

                expect(component.state().area).toEqual(expected);
                expect(component.state().error).toEqual('Error trying create area');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 25);
    });

    it('Should return data on submit', (done) => {

        let areaInput;
        let areaSelected;
        let Area = require('components/Area/Create/Area').default;
        let mockAdapter = new MockAdapter(axios);
        let context = {
            router: {
                push: (arg) => {
                    expect(arg).toEqual('/clients');
                }
            }
        };
        let component = mount(
            <Area />,
            { context }
        );
        let expected = {
            _id : 'Test',
            parent : 'South',
        }
        let response = {
            areas : [
                {
                    _id : "Center",
                },
                {
                    _id : "South",
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)
            .onPost(HOST + '/api/v1/area').reply(201)

        setTimeout(() => {

            try {

                let inputs = {
                    area : component.find('input'),
                    parent : component.find('select'),
                }

                areaInput = component.find('input');
                areaInput.node.value = 'Test';
                areaInput.simulate('change', areaInput);

                areaSelected = component.find('select');
                areaSelected.node.value = 'South';
                areaSelected.simulate('change', areaSelected);

                component.find('form').simulate('submit', { target: component.find('form').get(0) });

                expect(component.state().area).toEqual(expected);
                expect(component.state().error).toEqual('');
                done();
            } catch (e) {
                console.log(e);
            }
        }, 25);
    });

    it('Should show default error message', (done) => {

        let mockAdapter = new MockAdapter(axios);
        let Area = require('components/Area/Create/Area').default;
        let component = shallow(
            <Area />,
            { context }
        );

        setTimeout(() => {

            try {
                expect(component.find('h1').text()).toEqual('Create Area');
                expect(component.find('input').hasClass('input')).toBeTruthy();
                expect(component.find('button').text()).toEqual('Save');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });
});

