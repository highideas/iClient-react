import axios from 'axios';

const Visit = {
    getGroupByArea() {
        let config = {
            headers: {
                Authorization : window.localStorage.getItem('token')
            }
        };
        return axios.get(`${HOST}/api/v1/visit/group/area`, config);
    }
};

export default Visit;

