import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: API_BASE_URL,
});

http.defaults.headers.post['Content-Type'] = 'application/json';
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default http;