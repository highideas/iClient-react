import axios from 'axios';

import { HOST } from 'constants/Server';

const Client = {
    getClients(id = null) {
        let config = {
            headers: {
                Authorization : localStorage.token
            }
        };
        let url = [HOST, 'api', 'v1', 'client'];
        if (id) {
            url.push(id);
        }
        return axios.get(url.join('/'), config);
    }
};

export default Client;

