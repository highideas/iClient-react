
describe('Test iClient', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const enzyme = require('enzyme');
    const shallow = enzyme.shallow;
    const mount = enzyme.mount;
    const IClient = require('components/IClient/IClient').default;

    it('iClient should show login component if not logged', (done) => {

        let component = shallow(
            <IClient />
        );

        expect(component.text()).toEqual('<Login />');

        done();
    });

    it('iClient should show login component if not logged', (done) => {

        window.localStorage.setItem('token', 'test_menu');

        let component = shallow(
            <IClient>
                Test
            </IClient>
        );

        expect(component.text()).toEqual('<Menu />Test');

        done();
    });
});

