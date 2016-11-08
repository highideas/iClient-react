jest.enableAutomock();
jest.dontMock('components/Area/Area');
jest.dontMock('components/Error/Error');
jest.dontMock('react');
jest.dontMock('axios');
jest.dontMock('../tests/__mocks__/AreasResponseMock');
jest.dontMock('enzyme');


describe('Test Area', () => {
    const React = require('react');
    const Enzyme = require('enzyme');
    const shallow = Enzyme.shallow;
    let Visit = require('services/Visit').default;


    beforeEach((done) => {
        done();
    });

    test('Area should show nothing if no data', () => {

        let error = {response:{data:{error:"Not Found"}}};
        let promises = [];
        let Area;
        let component;

        promises.push(
            () => {
                Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        throw error;
                    });
                })
            }
        );

        promises.push(
            () => {
                Area = require('components/Area/Area').default;
            }
        );

        promises.push(
            () => {
                component = shallow(
                    <Area />
                );
            }
        );
//        component.setState({
//            error: error.response.data.error
//        });
        Promise.all(promises).then(() => {
            expect(component.state('error')).toEqual('Not Found');

            let errorComponent = shallow(
                component.instance().generateError(error.response.data.error)
            );

            expect(errorComponent.find('div').text()).toEqual('Not Found');
        }).catch((error) => {
            console.log(error);
        });
    });

    test('Area should show mocked data', () => {

        let response = {data:require('AreasResponseMock').default};
        Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(response);
            });
        })

        let Area = require('components/Area/Area').default;

        const component = shallow(
            <Area />
        );
        component.setState({
            areas: component.instance().generate(response.data.visits)
        });
        expect(component.find('.title').at(0).text()).toEqual('Center');
        expect(component.find('.title').at(1).text()).toEqual('South');
    });

});
