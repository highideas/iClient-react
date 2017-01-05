
describe('Test NavMenu', () => {
    const React = require('react');
    const shallow = require('enzyme').shallow;
    const NavMenu = require('components/NavMenu/NavMenu').default;

    it('NavMenu should render child', (done) => {

        let component = shallow(
            <NavMenu>
                <directive>Child</directive>
            </NavMenu>
        );

        expect(component.find('directive').text()).toEqual('Child');

        done();
    });

    it('toggleNavStatus function should change toggleNavStatus state from is-active to empty', (done) => {

        let component = shallow(
            <NavMenu />
        );

        component.instance().setState({ toggleNavStatus: 'is-active' });
        expect(component.state().toggleNavStatus).toEqual('is-active');
        component.instance().toggleNavStatus();
        expect(component.state().toggleNavStatus).toEqual('');

        done();
    });

    it('toggleNavStatus function should change toggleNavStatus state from empty to is-active', (done) => {

        let component = shallow(
            <NavMenu />
        );

        expect(component.state().toggleNavStatus).toEqual('');
        component.instance().toggleNavStatus();
        expect(component.state().toggleNavStatus).toEqual('is-active');

        done();
    });

    it('hide should change toggleNavStatus state to empty', (done) => {

        let component = shallow(
            <NavMenu />
        );

        component.instance().setState({ toggleNavStatus: 'whatever'} );
        expect(component.state().toggleNavStatus).toEqual('whatever');
        component.instance().hide(null);
        expect(component.state().toggleNavStatus).toEqual('');

        done();
    });
});

