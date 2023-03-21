import { BASE_URL } from "./constant";

export const getAllTasksAPI = () => `${BASE_URL}/todos?limit=10`;
export const deleteTaskAPI = (id) => `${BASE_URL}/todos/${id}`;