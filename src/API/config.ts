import axios from "axios";

export const myAxiosForAuth = axios.create({
    baseURL: 'http://localhost:5544/api/v2',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});


export const myAxios = axios.create({
    baseURL: 'http://localhost:5544/api/v2',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here'
    }
});