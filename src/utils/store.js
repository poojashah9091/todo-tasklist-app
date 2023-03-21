import { configureStore } from "@reduxjs/toolkit";
import taskListSliceReducer from "../data/taskListSlice";

const store = configureStore({
    reducer: {
        taskList: taskListSliceReducer
    }
});

export default store;