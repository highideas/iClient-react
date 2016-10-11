import axios from 'axios';

const host = 'http://localhost:3000';
const User = {
    login(username, password) {
        let auth = {
            username: username,
            password: password
        };
        return axios.post(`${host}/authenticate`, auth);
    }
};

export default User;
