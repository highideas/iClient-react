import axios from 'axios';

const host = 'http://localhost:3000';
const iClientUser = {
    login(username, password) {
        let auth = {
            username: username,
            password: password
        };
        return axios.post(`${host}/authenticate`, auth);
    }
};

export default iClientUser;
