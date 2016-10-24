import axios from 'axios';

import { HOST } from 'constants/Server';

const Visit = {
    getGroupByArea() {
        let config = {
            headers: {
                Authorization : localStorage.token
            }
        };
        return axios.get(`${HOST}/api/v1/visit/group/area`, config);
    }
};

export default Visit;

