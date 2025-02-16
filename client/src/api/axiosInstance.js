import axios from 'axios';

const Instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
})

export const login = async(data)=>{
    const res = await Instance.post('/login',data);
    return res.data;
}