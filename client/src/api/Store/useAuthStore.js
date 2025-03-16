import { create } from "zustand";
import Instance from "../axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const useAuthStore = create((set, get) => ({
  authUser: null,
  authLoader: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  users: [],
  roleUser:[],
  user:{} ,
  socket: null,

  checkAuth:async ()=>{
    set({authLoader:true})
    try {
      const res = await Instance.get("/users/check");
      // console.log(res.data);
      set({authUser:res.data})
      get().connectSocket();
    } catch (error) {
      console.log("Error come in checkAuth route",error.response.data);
    }finally{
      set({authLoader:false})
    }
  },

  getUsers: async () => {
    set({authLoader:true})
    try {
      const res = await Instance.get("/users/all");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in getuser route", error.response.data);
      toast.error(error.response.data.message);
    }finally{
      set({authLoader:false})
    }
  },

  getRoleByUsers: async (role) => {
    set({authLoader:true})
    try {
      const res = await Instance.get(`/users/${role}`);
      set({ roleUser: res.data });
    } catch (error) {
      console.log("Error in getuser route", error.response.data);
      toast.error(error.response.data.message);
    }finally{
      set({authLoader:false})
    }
  },
  getUser: async (name) => {
    set({authLoader:true})
    try {
      const res = await Instance.get(`/users/single/${name}`);
      set({ user: res.data });
    } catch (error) {
      console.log("Error in getuser route", error.response.data);
      toast.error(error.response.data.message);
    }finally{
      set({authLoader:false})
    }
  },

  register: async (data, navigate) => {
    set({authLoader:true})
    try {
      const res = await Instance.post("/users/signup", data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      navigate("/users/all");
      get().getUsers();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in login route", error);
    }finally{
      set({authLoader:false})
    }
  },
  login: async (data, navigate) => {
    set({authLoader:true})
    try {
      const res = await Instance.post("/users/login", data);
      toast.success(res.data.message);
      set({ authUser: res.data.user });
      navigate("/");
      get().connectSocket();
    } catch (error) {
      console.log("Error in login route", error.response.data);
      toast.error(error.response.data.message);
    }finally{
      set({authLoader:false})
    }
  },

  logout: async (navigate) => {
    set({authLoader:true})
    try {
      const res = await Instance.post("/users/logout");
      toast.success(res.data.message);
      set({ authUser: null });
      navigate("/login");
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logout route", error);
      toast.error(error.response.data.message);
    }finally{
      set({authLoader:false})
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io("http://localhost:8000",{
      query:{
        userId:authUser._id
      }
    });

    socket.connect();
    set({ socket:socket });

    socket.on("onlineUsers",(userIds)=>{
      set({onlineUsers:userIds})
    })
  },
  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  },
}));

export default useAuthStore;
