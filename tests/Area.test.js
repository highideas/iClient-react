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

    it('Area should show error message', (done) => {

        let error = {response:{data:{error:"Not Found"}}};
        let promises = [];
        let Area;
        let component;

        promises.push(
            (() => {
                Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        throw error;
                    });
                })
            })()
        );

        promises.push(
            (() => {
                Area = require('components/Area/Area').default;
            })()
        );

        promises.push(
            (() => {
                component = shallow(
                    <Area />
                );
            })()
        );

        Promise.all(promises).then(() => {
            expect(component.state('error')).toEqual('Not Found');

            let errorComponent = shallow(
                component.instance().generateError(error.response.data.error)
            );

            expect(errorComponent.find('div').text()).toEqual('Not Found');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

    it('Area should show nothing if no data', (done) => {

        let error = {data:{error:"Not Found"}};
        let promises = [];
        let Area;
        let component;

        promises.push(
            (() => {
                Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        throw error;
                    });
                })
            })()
        );

        promises.push(
            (() => {
                Area = require('components/Area/Area').default;
            })()
        );

        promises.push(
            (() => {
                component = shallow(
                    <Area />
                );
            })()
        );

        Promise.all(promises).then(() => {
            expect(component.state('error')).toEqual('');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

    it('Area should show mocked data', (done) => {

        let response = {data:require('AreasResponseMock').default};
        let promises = [];
        let Area;
        let component;

        promises.push(
            (() => {
                Visit.getGroupByArea = jest.genMockFunction().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        resolve(response);
                    });
                })
            })()
        );

        promises.push(
            (() => {
                Area = require('components/Area/Area').default;
            })()
        );

        promises.push(
            (() => {
                component = shallow(
                    <Area />
                );
            })()
        );

        Promise.all(promises).then(() => {
            expect(
                shallow(
                    component.state().areas[0]
                ).find('.title').at(0).text()
            ).toEqual('Center');
            expect(
                shallow(
                    component.state().areas[1]
                ).find('.title').at(0).text()
            ).toEqual('South');
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

});
