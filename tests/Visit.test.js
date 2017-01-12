
describe('Test Visit', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const shallow = require('enzyme').shallow;
    const Visit = require('components/Visit/Visit').default;

    it('Visit should empty table if no data', (done) => {

        let component = shallow(
            <Visit visits={ [] } />
        );


        expect(component.find('th').length).toEqual(3);
        expect(component.find('th').at(0).text()).toEqual('Name');
        expect(component.find('th').at(1).text()).toEqual('Last Visit');
        expect(component.find('th').at(2).text()).toEqual('');

        expect(component.find('tbody').length).toEqual(1);
        expect(component.find('tbody').children().length).toEqual(0);
        done();
    });

    it('Visit should table with visits data', (done) => {

        let visits = [
            {
                visit: {
                    client:{
                        name: 'Jon Snow'
                    },
                    visit_date: '2016-10-19T13:30:13.329Z',
                    _id: '000000000000000000000001'
                }
            },
            {
                visit: {
                    client:{
                        name: 'Cotter Pyke'
                    },
                    visit_date: '2016-10-18T13:31:14.430Z',
                    _id: '580615d5d992eb00738fab57'
                }
            },
        ];
        let component = shallow(
            <Visit visits={ visits } />
        );

        expect(component.find('tbody').children().length).toEqual(2);

        expect(component.find('td').length).toEqual(6);
        expect(component.find('td').at(0).text()).toEqual('Jon Snow');
        expect(component.find('td').at(1).text()).toEqual('Wed, 19 Oct 2016 13:30:13 GMT');
        expect(component.find('td').at(2).text()).toEqual('<Link />');

        expect(component.find('td').at(3).text()).toEqual('Cotter Pyke');
        expect(component.find('td').at(4).text()).toEqual('Tue, 18 Oct 2016 13:31:14 GMT');
        expect(component.find('td').at(5).text()).toEqual('<Link />');
        done();
    });
});

