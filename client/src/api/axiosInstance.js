import axios from 'axios';

const Instance = axios.create({
    baseURL: import.meta.env.VITE_backend,
    withCredentials: true
})

export default Instance;