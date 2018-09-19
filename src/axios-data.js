import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://index-api.bitcoin.com/api'
});

export default instance;