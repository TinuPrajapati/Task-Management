import {create} from "zustand";
import Instance from "../axiosInstance";
import toast from "react-hot-toast";

const useReminderStore= create((set,get)=>({
    reminders:[],
    reminderLoader:false,
}))

export default useReminderStore