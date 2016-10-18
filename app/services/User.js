import axios from 'axios';
import { HOST } from 'constants/Server';

const User = {
    login(username, password) {
        let auth = {
            username: username,
            password: password
        };
        return axios.post(`${HOST}/authenticate`, auth);
    }
};

export default User;
