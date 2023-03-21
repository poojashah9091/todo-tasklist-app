import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTasksAPI, deleteTaskAPI} from "./api";
import { client } from "./client";

export const fetchAllTasks = createAsyncThunk("taskList/fetchAllTasks", async() =>{
    const response = await client.get(getAllTasksAPI());
    return response.data.todos;
});

export const deleteTask = createAsyncThunk("taskList/deleteTask", async(id) =>{
    const response = await client.delete(deleteTaskAPI(id));
    return response.data;
})

const taskListSlice = createSlice({
        name: "taskList",
        initialState: {
            tasks: [],
            status: {},
            error: {
                type: "",
                message: ""
            }
        },
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(fetchAllTasks.pending, (state)=> {
                    state.status.GET_ALL = 'loading';
                })
                .addCase(fetchAllTasks.fulfilled, (state, action)=> {
                    state.status.GET_ALL = 'succeeded';
                    state.tasks = action.payload;
                })
                .addCase(fetchAllTasks.rejected, (state, action)=> {
                    state.status.GET_ALL = 'failed';
                    state.error.GET_ALL = action.error.message;
                })
                .addCase(deleteTask.pending, (state)=> {
                    state.status.DELETE = 'loading';
                })
                .addCase(deleteTask.fulfilled, (state, action)=> {
                    state.status.DELETE = 'succeeded';
                    state.tasks = state.tasks.filter( task => task.id !==action.payload.id );
                })
                .addCase(deleteTask.rejected, (state, action) => {
                    state.status.DELETE = 'failed';
                    state.error.DELETE = action.error.message;
                })
        }
});

export default taskListSlice.reducer;

