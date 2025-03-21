import {create} from "zustand";
import Instance from "../axiosInstance";
import toast from "react-hot-toast";

const useEmailStore= create((set,get)=>({
    emails:[],
    emailLoader:false,

    getAllEmails: async () => {
        set({emailLoader:true})
        try {
            const res = await Instance.get("/emails");
            set({ emails: res.data });
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data.message);
        }finally{
            set({emailLoader:false})
        }
    },

    sendEmails:async (data,navigate) => {
        set({emailLoader:true})
        try {
            const res = await Instance.post("/emails/office", data);
            toast.success(res.data.message);
            navigate("/emails/history");
            get().getAllEmails();
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data.message);
        }finally{
            set({emailLoader:false})
        }
    },

    sendEmailToOther:async (data,navigate) => {
        set({emailLoader:true})
        try {
            const res = await Instance.post("/emails/other", data);
            toast.success(res.data.message);
            navigate("/emails/history");
            get().getAllEmails();
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data.message);
        }finally{
            set({emailLoader:false})
        }
    },
}))

export default useEmailStore