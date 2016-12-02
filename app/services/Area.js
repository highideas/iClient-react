import axios from 'axios';

const Area = {

    getEntryPoint() {
        return [ HOST, 'api', 'v1', 'area' ];
    },

    getConfig() {
        return {
            headers: {
                Authorization : window.localStorage.getItem('token')
            }
        };
    },

    getAll() {
        return axios.get(this.getEntryPoint().join('/'), this.getConfig());
    },

    save(data) {
        return axios.post(this.getEntryPoint().join('/'), data, this.getConfig());
    }
};

export default Area;


