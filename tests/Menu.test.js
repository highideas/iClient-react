
describe('Test Menu', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const shallow = require('enzyme').shallow;
    const Menu = require('components/Menu/Menu').default;
    const context = {
        router: {
            push: () => null
        }
    };

    it('Menu should to know list of links', (done) => {

        let component = shallow(
            <Menu />,
            { context }
        );

        let expectedLinks = [
            ['/', 'Home'],
            ['/client', 'Client'],
            ['/area', 'Area'],
        ];

        expect(component.state().links).toEqual(expectedLinks);

        done();
    });

    it('HandleLogout should erase token in localStorage', (done) => {

        let component = shallow(
            <Menu />,
            { context }
        );

        window.localStorage.setItem('token', 'test_menu');

        expect(window.localStorage.getItem('token')).toEqual('test_menu');
        component.instance().handleLogout();
        expect(window.localStorage.getItem('token')).toEqual(null);
        done();
    });

    it('Menu should render links if logged in', (done) => {
        window.localStorage.setItem('token', 'test_menu');

        let component = shallow(
            <Menu />,
            { context }
        );

        expect(window.localStorage.getItem('token')).toEqual('test_menu');

        expect(component.childAt(0).text()).toEqual('<LinksApp />');
        expect(component.childAt(0).render().find('.nav-item.is-tab').length).toEqual(3);
        expect(component.childAt(1).text()).toEqual('Logout');
        done();
    });
});

