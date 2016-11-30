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

    getClient(id) {

        let url = this.getEntryPoint();
        url.push(id);

        return axios.get(url.join('/'), this.getConfig());
    },

    save(client) {
        return axios.post(this.getEntryPoint().join('/'), client, this.getConfig());
    }
};

export default Client;

