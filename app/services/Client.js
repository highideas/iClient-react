import axios from 'axios';

const Client = {

    getEntryPoint() {
        return [ HOST, 'api', 'v1', 'client' ];
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

    getClients() {
        return axios.get(this.getEntryPoint().join('/'), this.getConfig());
    },

    find(id) {

        let url = this.getEntryPoint();
        url.push(id);

        return axios.get(url.join('/'), this.getConfig());
    },

    save(client, id = undefined) {
        if (id !== undefined) {
            let url = this.getEntryPoint();
            url.push(id);
            return axios.put(url.join('/'), client, this.getConfig());
        }
        return axios.post(this.getEntryPoint().join('/'), client, this.getConfig());
    }
};

export default Client;

