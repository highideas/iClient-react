describe('Test Home', () => {
    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;

    test('Home should show welcome message', () => {

        let Home = require('components/Home/Home').default;

        const component = shallow(
            <Home />
        );

        expect(component.find('h1').text()).toEqual('Welcome to IClient');
    });
});

