import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "https://momentum.redberryinternship.ge/api";
const API_TOKEN = "9e69eb44-7672-495e-8db4-10ed2d93b87e";

const useStore = create((set, get) => ({
  tasks: [],
  employees: [],
  statuses: [],
  priorities: [],
  departments: [],

  fetchTasks: async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    set({ tasks: response.data });
  },

  fetchEmployees: async () => {
    const response = await axios.get(`${API_BASE_URL}/employees`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    set({ employees: response.data });
  },

  fetchStatuses: async () => {
    const response = await axios.get(`${API_BASE_URL}/statuses`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    set({ statuses: response.data });
  },

  fetchPriorities: async () => {
    const response = await axios.get(`${API_BASE_URL}/priorities`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    set({ priorities: response.data });
  },

  fetchDepartments: async () => {
    const response = await axios.get(`${API_BASE_URL}/departments`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    set({ departments: response.data });
  },

  fetchComments: async (taskId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/comments`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error.response?.data?.errors || error.message);
      return [];
    }
  },

  createEmployee: async (employeeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employees`, employeeData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({ employees: [...state.employees, response.data] }));
    } catch (error) {
      console.error("Error creating employee:", error.response?.data?.errors || error.message);
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      set((state) => ({ tasks: [...state.tasks, response.data] }));
    } catch (error) {
      console.error("Error creating task:", error.response?.data?.errors || error.message);
    }
  },

  addComment: async (taskId, commentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/${taskId}/comments`, commentData, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, comments: [...(task.comments || []), response.data] } : task
        ),
      }));
    } catch (error) {
      console.error("Error adding comment:", error.response?.data?.errors || error.message);
    }
  },

  getTaskById: (taskId) => {
    return get().tasks.find((task) => task.id === Number(taskId)) || null;
  },
}));

export default useStore;
