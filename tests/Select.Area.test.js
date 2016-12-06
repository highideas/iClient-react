jest.enableAutomock();
jest.dontMock('components/Area/Select/Area');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('axios-mock-adapter');
jest.dontMock('enzyme');
jest.dontMock('services/Area');

describe('Test Select Area', () => {
    require('../tests/__mocks__/LocalStorageMock');

    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    const mount = Enzyme.mount;
    const context = {
        router: {
            push: (arg) => arg
        }
    };

    let axios = require('axios');
    let MockAdapter = require('axios-mock-adapter');

    it('Should show props on select element', (done) => {

        let Area = require('components/Area/Select/Area').default;
        let mockAdapter = new MockAdapter(axios);
        let component = mount(
            <Area className='Unknown' select={ { name : 'TestOne', id : 'TestTwo', className : 'class' } }/>
        );

        mockAdapter.onGet(HOST + '/api/v1/area').reply(200, { areas : [] })

        setTimeout(() => {

            try {
                expect(
                    component.find('select').html()
                ).toEqual(
                    '<select name="TestOne" id="TestTwo" class="class"></select>'
                );
                expect(component.props()).toEqual({
                    className: 'Unknown',
                    select: {
                        name: 'TestOne',
                        id: 'TestTwo',
                        className: 'class'
                    }
                });
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });


    it('Should show mocked data', (done) => {

        let Area = require('components/Area/Select/Area').default;
        let mockAdapter = new MockAdapter(axios);
        let component = mount(
            <Area />
        );
        let response = {
            areas : [
                {
                    _id : "Center",
                    parent : "",
                    __v : 0,
                    ancestors : []
                },
                {
                    _id : "South",
                    parent : "",
                    __v : 0,
                    ancestors : []
                }
            ]
        };

        mockAdapter
            .onGet(HOST + '/api/v1/area').reply(200, response)

        setTimeout(() => {

            try {
                expect(component.find('option').at(0).text()).toEqual('Center');
                expect(component.find('option').at(1).text()).toEqual('South');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Should show error message', (done) => {

        let response = { error:'Areas Not Found' };
        let Area = require('components/Area/Select/Area').default;
        let mockAdapter = new MockAdapter(axios);
        let component = shallow(
            <Area />
        );

        mockAdapter.onGet(HOST + '/api/v1/area').reply(404, response);

        setTimeout(() => {

            try {
                component.update();
                expect(component.render().text()).toEqual('Areas Not Found');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });

    it('Should show default error message', (done) => {

        let mockAdapter = new MockAdapter(axios);
        let Area = require('components/Area/Select/Area').default;
        let component = shallow(
            <Area />
        );

        mockAdapter.onGet(HOST + '/api/v1/area').reply(503);

        setTimeout(() => {

            try {
                expect(component.render().text()).toEqual('Error Found: Trying get areas');
                done();
            } catch(e) {
                console.log(e);
            }
        }, 0);
    });
});

