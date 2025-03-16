import {create} from "zustand";
import Instance from "../axiosInstance";
import toast from "react-hot-toast";

const useProjectStore= create((set,get)=>({
    allProjects:[],
    projects:[],
    projectLoader:false,

    getProjects: async () => {
        set({projectLoader:true})
        try {
            const res = await Instance.get("/projects");
            set({ projects: res.data });
        } catch (error) {
            console.log("Error in getuser route", error.response.data);
            toast.error(error.response.data.message);
        }finally{
            set({projectLoader:false})
        }
    },
    getAllProjects: async () => {
        set({projectLoader:true})
        try {
            const res = await Instance.get("/projects/all");
            set({ allProjects: res.data });
        } catch (error) {
            console.log("Error in getuser route", error.response.data);
            toast.error(error.response.data.message);
        }finally{
            set({projectLoader:false})
        }
    },

    createProject: async (data,navigate) => {
        set({projectLoader:true})
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
        }finally{
            set({projectLoader:false})
        }
    },
    deleteProject: async (id,display) => {
        set({projectLoader:true})
        try {
            const res = await Instance.delete(`/projects/delete/${id}`);
            toast.success(res.data.message);
            display(false);
            get().getProjects();
        } catch (error) {
            // console.log("Error in getuser route", error.response.data);
            toast.error(error.response.data.message);
        }finally{
            set({projectLoader:false})
        }
    },


})) 

export default useProjectStore