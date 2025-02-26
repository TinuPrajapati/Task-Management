import axios from 'axios';

const Instance = axios.create({
    baseURL: import.meta.env.VITE_backend,
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
    const res = await Instance.post('/admin/register',data,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
}

export const getUsers = async()=>{
    const res = await Instance.get('/admin/all_users');
    return res.data;
};

export const addSelfTodo = async(data)=>{
    const res = await Instance.post('/create_self_todo',data);
    return res.data;
}

export const getSelfTodos = async()=>{
    const res = await Instance.get('/todos');
    return res.data;
}

export const deleteSelfTodo = async(id)=>{
    const res = await Instance.delete(`/delete_self_todo/${id}`);
    return res.data;
}

export const addAssignedTodo = async(data)=>{
    const res = await Instance.post('/create_assigned_todo',data);
    return res.data;
}

export const createAssignedTasks = async(data)=>{
    const res = await Instance.post('/create_assigned_tasks',data);
    return res.data;
}

export const allUsers= async(role)=>{
    const res = await Instance.get(`/admin/users/${role}`);
    return res.data;
}