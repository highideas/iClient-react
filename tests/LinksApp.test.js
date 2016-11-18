describe('Test LinksApp', () => {
    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;

    beforeEach((done) => {
        done();
    });

    test('LinksApp should show links received from props', () => {

        let LinksApp = require('components/LinksApp/LinksApp').default;
        let links = [
            ['/route', 'description'],
            ['/anotherRoute', 'Another Description']
        ];
        const context = { onClick: () => 'foo' };

        const component = shallow(
            <LinksApp links={links} />,
            { context }
        );

        component.instance().handleClick(null);

        let firstLink = shallow(
            component.instance().generate()[0]
        );

        let secondLink = shallow(
            component.instance().generate()[1]
        );

        expect(firstLink.text()).toEqual('description');
        expect(firstLink.instance().props.to).toEqual('/route');

        expect(secondLink.text()).toEqual('Another Description');
        expect(secondLink.instance().props.to).toEqual('/anotherRoute');
    });

    test('LinksApp should show nothing', () => {

        let LinksApp = require('components/LinksApp/LinksApp').default;
        let links = [];

        const component = shallow(
            <LinksApp links={links} />
        );

        component.instance().handleClick(null);

        expect(component.instance().generate()).toEqual([]);
    });
});

