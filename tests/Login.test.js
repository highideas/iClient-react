jest.enableAutomock();
jest.dontMock('components/Login/Login');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('enzyme');
jest.dontMock('axios-mock-adapter');
jest.dontMock('services/User');

describe('Test Login', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const enzyme = require('enzyme');
    const shallow = enzyme.shallow;
    const mount = enzyme.mount;
    const Login = require('components/Login/Login').default;
    const context = {
        router: {
            push: (arg) => arg
        }
    };
    let axios = require('axios');
    let MockAdapter = require('axios-mock-adapter');

    let User = require('services/User').default;

    it('Login should show form', (done) => {

        let component = shallow(
            <Login />,
            { context }
        );

        setTimeout(() => {
            expect(component.find('form').length).toEqual(1);

            done();
        }, 0);
    });

    it('Login should not set localStorage if success is different from 200', (done) => {

        let Login = require('components/Login/Login').default;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onPost('http://localhost:3000/authenticate').reply(201, {success: 201, token: 'token_test'});

        let component = mount(
            <Login />,
            { context }
        );

        let inputLogin = component.find('form div p input[type="text"]');
        let inputPassword = component.find('form div p input[type="password"]');

        inputLogin.node.value = 'Astolfo';
        inputLogin.simulate('change', inputLogin);

        inputPassword.node.value = 'abcd';
        inputPassword.simulate('change', inputPassword);

        expect(window.localStorage.getItem('token')).toEqual(null);

        component.find('form').simulate('submit', { target: component.find('form').get(0) });

        setTimeout(() => {
            expect(window.localStorage.getItem('token')).toEqual(null);
            done();
        }, 0);
    });

    it('Login should set localStorage', (done) => {

        let Login = require('components/Login/Login').default;
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onPost('http://localhost:3000/authenticate').reply(200, {success: 200, token: 'token_test'});

        let component = mount(
            <Login />,
            { context }
        );

        let inputLogin = component.find('form div p input[type="text"]');
        let inputPassword = component.find('form div p input[type="password"]');

        inputLogin.node.value = 'Astolfo';
        inputLogin.simulate('change', inputLogin);

        inputPassword.node.value = 'abcd';
        inputPassword.simulate('change', inputPassword);

        expect(window.localStorage.getItem('token')).toEqual(null);

        component.find('form').simulate('submit', { target: component.find('form').get(0) });

        setTimeout(() => {
            expect(window.localStorage.getItem('token')).toEqual('token_test');
            done();
        }, 0);
    });

    it('Login should show error default on state', (done) => {

        let Login = require('components/Login/Login').default;
        let response = {};
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onPost('http://localhost:3000/authenticate').reply(503, response);

        let component = mount(
            <Login />,
            { context }
        );

        let inputLogin = component.find('form div p input[type="text"]');
        let inputPassword = component.find('form div p input[type="password"]');

        inputLogin.node.value = 'Astolfo';
        inputLogin.simulate('change', inputLogin);

        inputPassword.node.value = 'abcd';
        inputPassword.simulate('change', inputPassword);

        component.find('form').simulate('submit', { target: component.find('form').get(0) });

        setTimeout(() => {
            expect(component.state().error).toEqual('Authentication failed');
            done();
        }, 0);
    });

    it('Login should set error received on state', (done) => {

        let Login = require('components/Login/Login').default;
        let response = { error:"User Not Found" };
        let mockAdapter = new MockAdapter(axios);

        mockAdapter.onPost('http://localhost:3000/authenticate').reply(401, response);

        let component = mount(
            <Login />,
            { context }
        );

        let inputLogin = component.find('form div p input[type="text"]');
        let inputPassword = component.find('form div p input[type="password"]');

        inputLogin.node.value = 'Astolfo';
        inputLogin.simulate('change', inputLogin);

        inputPassword.node.value = 'abcd';
        inputPassword.simulate('change', inputPassword);

        component.find('form').simulate('submit', { target: component.find('form').get(0) });

        setTimeout(() => {
            expect(component.state().error).toEqual('User Not Found');
            done();
        }, 0);
    });

});

