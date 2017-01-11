import axios from 'axios';

const User = {

    getConfig() {
        let config = {
            headers: {
            }
        };

        if (jsonStubHeaders != undefined && jsonStubHeaders != '') {
            Object.assign(config.headers, JSON.parse(jsonStubHeaders));
        }
        return config;
    },

    login(username, password) {
        let auth = {
            username: username,
            password: password
        };
        return axios.post(`${HOST}/authenticate`, auth, this.getConfig());
    }
};

export default User;
