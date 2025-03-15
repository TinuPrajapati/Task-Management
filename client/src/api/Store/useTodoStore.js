import { create } from "zustand";
import toast from "react-hot-toast";
import Instance from "../axiosInstance";

export const useTodoStore = create((set, get) => ({
  todos: [],

  addSelfTodo: async (todo) => {
    try {
      const res = await Instance.post("/selftodos/add", todo);
      console.log(res.data);
      toast.success(res.data.message);
      get().getSelfTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data)
    }
  },

  getSelfTodos: async () => {
    try {
      const res = await Instance.get("/selftodos");
      // console.log(res.data);
      set({ todos: res.data });
    } catch (error) {
      //    console.log(error.response.data)
      toast.error(error.response.data.message);
    }
  },
  deleteSelfTodo: async (id) => {
    try {
      const res = await Instance.delete(`/selftodos/delete/${id}`);
      toast.success(res.data.message);
      get().getSelfTodos();
    } catch (error) {
    //   console.log(error);
      toast.error(error.response.data.message);
    }
  },
}));
