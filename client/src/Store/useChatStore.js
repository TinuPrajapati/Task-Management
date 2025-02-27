import {create} from "zustand";
import Instance from "../api/axiosInstance";
import useAuthStore from "./useAuthStore";


const useChatStore= create((set,get)=>({
    message:[],
    selectedUser:null,

    getMessages:async(id)=>{
        try {
            const res = await Instance.get(`/chats/${id}`);
            set({ message: res.data });
        } catch (error) {
            console.log("Error in getMessages route",error.response.data);
        }
    },

    sendMessage: async (id,data) => {
        try {
            const res = await Instance.post(`/chats/send/${id}`,{msg:data});
            console.log(res.data);
            set({message:[...get().message,res.data]})
        } catch (error) {
            console.log("Error in sendMessage route",error.response.data);
        }    
    },

    subscribeToChat: ()=>{
        const {selectedUser}= get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.emit("newMessage",(data)=>{
            console.log(data);
            set({message:[...get().message,data]})
        })
    },

    unSubscribeToChat: ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    selectUser: (user)=>{
        set({selectedUser:user});
    }
    
}));

export default useChatStore;