import { configureStore } from "@reduxjs/toolkit";
import taskListSlice from "../data/taskListSlice";

const store = configureStore({
    reducer: {
        taskList: taskListSlice
    }
});

export default store;