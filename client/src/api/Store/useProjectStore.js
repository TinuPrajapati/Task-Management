import {create} from "zustand";
import Instance from "../axiosInstance";
import toast from "react-hot-toast";

const useProjectStore= create((set,get)=>({
    allProjects:[],
    projects:[],

    getProjects: async () => {
        try {
            const res = await Instance.get("/projects/all");
            set({ allProjects: res.data });
        } catch (error) {
            console.log("Error in getuser route", error.response.data);
            toast.error(error.response.data.message);
        }
    },

    createProject: async (data,navigate) => {
        try {
            const formdata = new FormData();
            formdata.append("name",data.name);
            formdata.append("description",data.description);
            formdata.append("priority",data.priority);
            formdata.append("category",data.role);
            formdata.append("assignedTo",data.assignedTo);
            formdata.append("startDate",data.startDate);
            formdata.append("endDate",data.endDate);
            data.file.forEach((file) => formdata.append("file", file));
            const res = await Instance.post("/projects/add",formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            toast.success(res.data.message);
            navigate("/projects/assigned");
            get().getProjects();
        } catch (error) {
            // console.log("Error in getuser route", error.response.data);
            toast.error(error.response.data.message);
        }
    },
    deleteProject: async (id,display) => {
        try {
            const res = await Instance.delete(`/projects/delete/${id}`);
            toast.success(res.data.message);
            display(false);
            get().getProjects();
        } catch (error) {
            // console.log("Error in getuser route", error.response.data);
            toast.error(error.response.data.message);
        }
    },


})) 

export default useProjectStore