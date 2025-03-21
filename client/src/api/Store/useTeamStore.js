import { create } from "zustand";
import Instance from "../axiosInstance";
import toast from "react-hot-toast";

const useTeamStore = create((set, get) => ({
    teams: [],
    teamLoader: false,

    getAllTeams: async () => {
        set({ teamLoader: true });
        try {
            const res = await Instance.get("/teams");
            set({ teams: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ teamLoader: false });
        }
    },

    addTeam: async (team,navigate) => {
        set({ teamLoader: true });  
        const formData = new FormData();
        formData.append("name", team.name);
        formData.append("projectName", team.projectName);
        formData.append("description", team.description);
        formData.append("priority", team.priority);
        formData.append("startDate", team.startDate);
        formData.append("endDate", team.endDate);
        team.members.forEach((member, index) => formData.append("members[]", member._id));
        // team.file.forEach((file) => formData.append("file", file));
        try {
            const res = await Instance.post("/teams/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },  
            });
            console.log(res.data);
            toast.success(res.data.message);
            get().getAllTeams();
            navigate("/team-projects/tasks");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ teamLoader: false });
        }
    },

    deleteTeam: async (id) => { 
        set({ teamLoader: true });
        try {
            const res = await Instance.delete(`/teams/delete/${id}`);
            toast.success(res.data.message);
            get().getAllTeams();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ teamLoader: false });
        }
    },
}));    

export default useTeamStore