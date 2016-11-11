jest.enableAutomock();
jest.dontMock('components/Login/Login');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('enzyme');

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
    let User = require('services/User').default;

    it('Login should show form', (done) => {

        let component = shallow(
            <Login />,
            { context }
        );

        expect(component.find('form').length).toEqual(1);

        done();
    });

    it('Login should get login values', (done) => {

        let Login = require('components/Login/Login').default;
        let loginInformed;
        let passwordInformed;

        User.login = jest.genMockFunction().mockImplementation((login, password) => {
            return new Promise((resolve, reject) => {
                loginInformed = login;
                passwordInformed = password;
            });
        })

        let component = mount(
            <Login />,
            { context }
        );

        expect(loginInformed).toEqual(undefined);
        expect(passwordInformed).toEqual(undefined);

        let inputLogin = component.find('form div p input[type="text"]');
        let inputPassword = component.find('form div p input[type="password"]');

        inputLogin.node.value = 'Astolfo';
        inputLogin.simulate('change', inputLogin);

        inputPassword.node.value = 'abcd';
        inputPassword.simulate('change', inputPassword);

        component.find('form').simulate('submit', { target: component.find('form').get(0) });

        expect(loginInformed).toEqual('Astolfo');
        expect(passwordInformed).toEqual('abcd');

        done();
    });

    it('Login should not set localStorage if success is different from 200', (done) => {

        let Login = require('components/Login/Login').default;
        let promises = [];

        User.login = jest.genMockFunction().mockImplementation((login, password) => {
            return new Promise((resolve, reject) => {
                resolve({data: {success: 201, token: 'token_test'}});
            });
        })

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

        promises.push(
            (() => {
                component.find('form').simulate('submit', { target: component.find('form').get(0) });
            })()
        );

        Promise.all(promises).then(() => {
            expect(window.localStorage.getItem('token')).toEqual(null);
            done();
        }).catch((error) => {
            console.log(error);
        });
    });


    it('Login should set localStorage', (done) => {

        let Login = require('components/Login/Login').default;
        let promises = [];

        User.login = jest.genMockFunction().mockImplementation((login, password) => {
            return new Promise((resolve, reject) => {
                resolve({data: {success: 200, token: 'token_test'}});
            });
        })

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

        promises.push(
            (() => {
                component.find('form').simulate('submit', { target: component.find('form').get(0) });
            })()
        );

        Promise.all(promises).then(() => {
            expect(window.localStorage.getItem('token')).toEqual('token_test');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

    it('Login should show error default on state', (done) => {

        let Login = require('components/Login/Login').default;
        let error = {response:{error:"Another error"}};
        let promises = [];

        User.login = jest.genMockFunction().mockImplementation((login, password) => {
            return new Promise((resolve, reject) => {
                throw error;
            });
        })

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

        promises.push(
            (() => {
                component.find('form').simulate('submit', { target: component.find('form').get(0) });
            })()
        );

        Promise.all(promises).then(() => {
            expect(component.state().error).toEqual('Authentication failed');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });


    it('Login should set error received on state', (done) => {

        let Login = require('components/Login/Login').default;
        let error = {response:{data:{error:"User Not Found"}}};
        let promises = [];

        User.login = jest.genMockFunction().mockImplementation((login, password) => {
            return new Promise((resolve, reject) => {
                throw error;
            });
        })

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

        promises.push(
            (() => {
                component.find('form').simulate('submit', { target: component.find('form').get(0) });
            })()
        );

        Promise.all(promises).then(() => {
            expect(component.state().error).toEqual('User Not Found');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

});

