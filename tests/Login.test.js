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
            push: () => null
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

    it('Login should show error message', (done) => {

        let promises = [];
        let Login;
        let component;
        let loginInformed;
        let passwordInformed;

        promises.push(
            (() => {
                User.login = jest.genMockFunction().mockImplementation((login, password) => {
                    return new Promise((resolve, reject) => {
                        loginInformed = login;
                        passwordInformed = password;
                    });
                })
            })()
        );

        promises.push(
            (() => {
                Login = require('components/Login/Login').default;
            })()
        );

        promises.push(
            (() => {
                component = mount(
                    <Login />,
                    { context }
                );
            })()
        );

        Promise.all(promises).then(() => {

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
        }).catch((error) => {
            console.log(error);
        });
    });

});

