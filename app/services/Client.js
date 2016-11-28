import axios from 'axios';

import { HOST } from 'constants/Server';

const Client = {

    getClients() {
        let url = [HOST, 'api', 'v1', 'client'];

        let config = {
            headers: {
                Authorization : window.localStorage.getItem('token')
            }
        };
        return axios.get(url.join('/'), config);
    },

    getClient(id) {

        let url = [HOST, 'api', 'v1', 'client'];
        url.push(id);

        let config = {
            headers: {
                Authorization : window.localStorage.getItem('token')
            }
        };
        return axios.get(url.join('/'), config);
    }
};

export default Client;

