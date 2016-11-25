jest.enableAutomock();
jest.dontMock('components/Client/List/Client');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('enzyme');


describe('Test Client', () => {
    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    let ClientService = require('services/Client').default;

    it('Client should show error message', (done) => {

        let error = {response:{data:{error:"Client Not Found"}}};
        let promises = [];
        let Client;
        let component;

        promises.push(
            (() => {
                ClientService.getClients = jest.genMockFunction().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        throw error;
                    });
                })
            })()
        );

        promises.push(
            (() => {
                Client = require('components/Client/List/Client').default;
            })()
        );

        promises.push(
            (() => {
                component = shallow(
                    <Client />
                );
            })()
        );

        Promise.all(promises).then(() => {
            component.update();
            expect(component.render().text()).toEqual('Client Not Found');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

    it('Client should show default error message', (done) => {

        let error = {error:"Client Not Found"};
        let promises = [];
        let Client;
        let component;

        promises.push(
            (() => {
                ClientService.getClients = jest.genMockFunction().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        throw error;
                    });
                })
            })()
        );

        promises.push(
            (() => {
                Client = require('components/Client/List/Client').default;
            })()
        );

        promises.push(
            (() => {
                component = shallow(
                    <Client />
                );
            })()
        );

        Promise.all(promises).then(() => {
            component.update();
            expect(component.render().text()).toEqual('Error Found: Trying get client');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

    it('Client should show mocked data', (done) => {

        let response = {
            data: {
                clients: [
                    {name: 'Jon Snow', address: '7 Street', city: 'Winterfell'},
                    {name: 'Cotter Pyke', address: '0 Street', city: 'Castle Black'},
                ]
            }
        };
        let promises = [];
        let Client;
        let component;

        promises.push(
            (() => {
                ClientService.getClients = jest.genMockFunction().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        resolve(response);
                    });
                })
            })()
        );

        promises.push(
            (() => {
                Client = require('components/Client/List/Client').default;
            })()
        );

        promises.push(
            (() => {
                component = shallow(
                    <Client />
                );
            })()
        );

        Promise.all(promises).then(() => {
            component.update();
            expect(component.find('tbody td').at(0).text()).toEqual('Jon Snow');
            expect(component.find('tbody td').at(1).text()).toEqual('7 Street - Winterfell');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

});

