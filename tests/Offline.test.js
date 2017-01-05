
describe('Test Offline', () => {
    const React = require('react');
    const enzyme = require('enzyme');
    const shallow = enzyme.shallow;
    const Offline = require('components/Offline/Offline').default;

    it('Offline should show message when without internet', (done) => {

        window.navigator.__defineGetter__('onLine', function(){
            return false;
        });

        let component = shallow(<Offline />);

        expect(component.text()).toEqual('Off Line');
        expect(component.state().networkStatus).toEqual({"display": ""});

        done();

    });

    it('Offline should display none when with internet', (done) => {

        window.navigator.__defineGetter__('onLine', function(){
            return true;
        });

        let component = shallow(<Offline />);

        expect(component.state().networkStatus).toEqual({"display": "none"});
        done();

    });
});
