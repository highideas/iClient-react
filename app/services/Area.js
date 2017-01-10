import axios from 'axios';

const Area = {

    getEntryPoint() {
        return [ HOST, 'api', 'v1', 'area' ];
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

    getAll() {
        return axios.get(this.getEntryPoint().join('/'), this.getConfig());
    },

    save(data) {
        return axios.post(this.getEntryPoint().join('/'), data, this.getConfig());
    }
};

export default Area;


