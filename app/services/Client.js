import axios from 'axios';

const Client = {

    getEntryPoint() {
        return [ HOST, 'api', 'v1', 'client' ];
    },

    getConfig() {
        return {
            headers: {
                Authorization : window.localStorage.getItem('token')
            }
        };
    },

    getClients() {
        return axios.get(this.getEntryPoint().join('/'), this.getConfig());
    },

    find(id) {

        let url = this.getEntryPoint();
        url.push(id);

        return axios.get(url.join('/'), this.getConfig());
    },

    save(client, method = 'post') {
        if (method == 'put') {
            return axios.put(this.getEntryPoint().join('/'), client, this.getConfig());
        }
        return axios.post(this.getEntryPoint().join('/'), client, this.getConfig());
    }
};

export default Client;

