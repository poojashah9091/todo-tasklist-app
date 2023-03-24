import { BASE_URL } from "./constant";

export const getAllTasksAPI = () => `${BASE_URL}/todos?limit=10`;
export const deleteTaskAPI = (id) => `${BASE_URL}/todos/${id}`;
export const updateTaskAPI = (id) => `${BASE_URL}/todos/${id}`;
export const addTaskAPI = () => `${BASE_URL}/todos/add`;