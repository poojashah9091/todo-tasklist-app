import { createSlice } from "@reduxjs/toolkit";

const taskListSlice = createSlice({
        name: "taskList",
        initialState: {tasks:[]},
        reducers: {
            addTask: (state, payload) => {
                state.tasks.push(payload);
            },
            editTask: (state, payload) => {

            },
            removeTask: (state, payload) => {

            }
        }
});

export const {addTask, editTask, removeTask} = taskListSlice.actions;
export default taskListSlice.reducer;

