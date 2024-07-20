import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com',
});

export const get = (url, config = {}) => api.get(url, config);
export const post = (url, data, config = {}) => api.post(url, data, config);
export const put = (url, data, config = {}) => api.put(url, data, config);
export const del = (url, config = {}) => api.delete(url, config);

export default { get, post, put, del };
