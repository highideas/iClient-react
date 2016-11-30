import axios from 'axios';

const Area = {

    getAll() {
        let url = [HOST, 'api', 'v1', 'area'];

        let config = {
            headers: {
                Authorization : window.localStorage.getItem('token')
            }
        };
        return axios.get(url.join('/'), config);
    }
};

export default Area;


