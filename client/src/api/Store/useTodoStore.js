import { create } from "zustand";
import toast from "react-hot-toast";
import Instance from "../axiosInstance";

export const useTodoStore = create((set, get) => ({
  todos: [],
  assingedTodo:[],
  todoLoader: false,

  addSelfTodo: async (todo) => {
    set({ todoLoader: true });
    try {
      const res = await Instance.post("/selftodos/add", todo);
      console.log(res.data);
      toast.success(res.data.message);
      get().getSelfTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data)
    }finally{
      set({ todoLoader: false });
    }
  },

  getSelfTodos: async () => {
    set({ todoLoader: true });
    try {
      const res = await Instance.get("/selftodos");
      // console.log(res.data);
      set({ todos: res.data });
    } catch (error) {
      //    console.log(error.response.data)
      toast.error(error.response.data.message);
    }finally{
      set({ todoLoader: false });
    }
  },
  deleteSelfTodo: async (id) => {
    set({ todoLoader: true });
    try {
      const res = await Instance.delete(`/selftodos/delete/${id}`);
      toast.success(res.data.message);
      get().getSelfTodos();
    } catch (error) {
    //   console.log(error);
      toast.error(error.response.data.message);
    }finally{
      set({ todoLoader: false });
    }
  },

  CreateAssignedTodo: async (todo) => {
    set({ todoLoader: true });
    try {
      const res = await Instance.post("/assignedtodos/add", todo);
      // console.log(res.data);
      toast.success(res.data.message);
      get().getAssignedTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({ todoLoader: false });
    }
  },
  getAssignedTodos: async () => {
    set({ todoLoader: true });
    try {
      const res = await Instance.get("/assignedtodos");
      set({ assingedTodo: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({ todoLoader: false });
    }
  },
  getAssignedTodosAll: async () => {
    set({ todoLoader: true });
    try {
      const res = await Instance.get("/assignedtodos/all");
      set({ assingedTodo: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateAssignedTodo: async (todo) => {
    set({ todoLoader: true });
    try {
      const res = await Instance.put("/assignedtodos/update", todo);
      // console.log(res.data);
      toast.success(res.data.message);
      get().getAssignedTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({ todoLoader: false });
    }
  },
  deleteAssignedTodos: async (id) => {
    set({ todoLoader: true });
    try {
      const res = await Instance.delete(`/assignedtodos/delete/${id}`);
      toast.success(res.data.message);
      get().getAssignedTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({ todoLoader: false });
    }
  },
}));
