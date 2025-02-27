import axios from 'axios';

const Instance = axios.create({
    baseURL: import.meta.env.VITE_backend,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
})

export default Instance;