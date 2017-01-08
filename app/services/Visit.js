import axios from 'axios';

const Visit = {

    getEntryPoint() {
        return [ HOST, 'api', 'v1', 'visit' ];
    },

    getConfig() {
        let config = {
            headers: {
                Authorization : window.localStorage.getItem('token')
            },
            data: {}
        };

        if (jsonStubHeaders != undefined && jsonStubHeaders != '') {
            Object.assign(config.headers, JSON.parse(jsonStubHeaders));
        }
        return config;
    },

    getGroupByArea() {
        let url = this.getEntryPoint();
        url.push('group', 'area');
        return axios.get(url.join('/'), this.getConfig());
    },

    save(data) {
        return axios.post(this.getEntryPoint().join('/'), data, this.getConfig());
    }
};

export default Visit;

