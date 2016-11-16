import axios from 'axios';

import { HOST } from 'constants/Server';

const Client = {
    getClients() {
        let config = {
            headers: {
                Authorization : localStorage.token
            }
        };
        return axios.get(`${HOST}/api/v1/client`, config);
    }
};

export default Client;

