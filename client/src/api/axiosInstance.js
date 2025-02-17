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

export const logout = async()=>{
    const res = await Instance.get('/logout');
    return res.data;
}

export const register = async(data)=>{
    console.log(data)
    const res = await Instance.post('/admin/register',data);
    return res.data;
}