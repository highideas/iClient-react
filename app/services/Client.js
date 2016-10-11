import axios from 'axios';

const host = 'http://localhost:3000';
const Client = {
    getClients() {
        let config = {
            headers: {
                Authorization : localStorage.token
            }
        };
        return axios.get(`${host}/api/v1/client`, config);
    }
};

export default Client;

