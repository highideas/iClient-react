import axios from 'axios';

const Visit = {

    getEntryPoint() {
        return [ HOST, 'api', 'v1', 'visit' ];
    },

    getConfig() {
        return {
            headers: {
                Authorization : window.localStorage.getItem('token')
            }
        };
    },

    getGroupByArea() {
        let url = this.getEntryPoint();
        url.push('group', 'area');
        return axios.get(url.join('/'), this.getConfig());
    },

    save(data) {
        return axios.post(this.getEntryPoint().join('/'), data, this.getConfig());
    },

    find(id) {
        let url = this.getEntryPoint();
        url.push(id);

        return axios.get(url.join('/'), this.getConfig());
    }
};

export default Visit;

