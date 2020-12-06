import axios from 'axios';
import { api } from '../urlConfig';

const axiosIntance = axios.create({
    baseURL: api,
    // headers: {
    //     'Authorization': token ? `Bearer ${token}` : ''
    // }
});

export default axiosIntance;