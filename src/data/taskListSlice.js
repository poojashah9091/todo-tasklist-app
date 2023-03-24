import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTasksAPI, deleteTaskAPI, updateTaskAPI, addTaskAPI} from "./api";
import { client } from "./client";

export const fetchAllTasks = createAsyncThunk("taskList/fetchAllTasks", async() =>{
    const response = await client.get(getAllTasksAPI());
    return response.data.todos;
});

export const deleteTask = createAsyncThunk("taskList/deleteTask", async(id) =>{
    const response = await client.delete(deleteTaskAPI(id));
    return response.data;
});

export const updateTask = createAsyncThunk("taskList/updateTask", async({id, taskData}) =>{
    const response = await client.put(updateTaskAPI(id), {todo: taskData});
    return response.data;
})

export const addTask = createAsyncThunk("taskList/addTask", async(taskData)=>{
    const response = await client.post(addTaskAPI(), {todo: taskData, userId: 48});
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
                .addCase(deleteTask.rejected, (state, action)=> {
                    state.status.DELETE = 'failed';
                    state.error.DELETE = action.error.message;
                })
                .addCase(updateTask.pending, (state)=> {
                    state.status.UPDATE = 'loading';
                })
                .addCase(updateTask.fulfilled, (state, action)=> {
                    state.status.UPDATE = 'succeeded';
                    const task = state.tasks.findIndex(task => task.id ===action.payload.id);
                    state.tasks[task].todo = action.payload.todo;
                })  
                .addCase(updateTask.rejected, (state)=> {
                    state.status.UPDATE = 'failed';
                })
                .addCase(addTask.pending, (state)=> {
                    state.status.ADD = "pending";
                })
                .addCase(addTask.fulfilled, (state, action)=> {
                    state.status.ADD = "succeeded";
                    state.tasks.push(action.payload);
                })
                .addCase(addTask.rejected, (state)=> {
                    state.status.ADD = "failed";
                })
        }
});

export default taskListSlice.reducer;

