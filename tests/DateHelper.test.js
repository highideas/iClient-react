
describe('Test DateHelper', () => {

    const DateHelper = require('helpers/Date').default;

    it ('should return date on format GMT', (done) => {
        let date = DateHelper.format('2016-10-19T13:30:13.329Z');
        expect(date).toEqual("Wed, 19 Oct 2016 13:30:13 GMT");
        done();
    });
});
