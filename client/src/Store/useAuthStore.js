import { create } from "zustand";
import Instance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  users: [],
  socket: null,

  checkAuth:async ()=>{
    try {
      const res = await Instance.get("/admin/check");
      set({authUser:res.data})
      get().connectSocket();
    } catch (error) {
      console.log("Error come in checkAuth route",error.response.data);
    }
  },

  getUsers: async () => {
    try {
      const res = await Instance.get("/admin/all_users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in getuser route", error.response.data);
      toast.error(error.response.data.message);
    }
  },

  login: async (data, navigate) => {
    try {
      const res = await Instance.post("/login", data);
      toast.success(res.data.message);
      set({ authUser: res.data.user });
      navigate("/");
      get().connectSocket();
    } catch (error) {
      console.log("Error in login route", error.response.data);
      toast.error(error.response.data.message);
    }
  },

  logout: async (navigate) => {
    try {
      const res = await Instance.get("/logout");
      toast.success(res.data.message);
      set({ authUser: null });
      navigate("/login");
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logout route", error);
      toast.error(error.response.data.message);
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
