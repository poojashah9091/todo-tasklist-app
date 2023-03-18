import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTask } from "../../data/taskListSlice";
import TaskItem from "../TaskItem";
import "./style.scss";

const TaskSheet = () => {

    const [taskList, setTaskList] = useState([]);
    // const dispatch = useDispatch();
    // const taskItems = useSelector(store => store.taskList.tasks);
    // console.log("taskItems-->",taskItems);

    const getTaskList = async() => {
        const data = await fetch('https://dummyjson.com/todos?limit=10');
        const json = await data.json();
        // dispatch(addTask(json?.todos));
        setTaskList(json?.todos);
    }
    useEffect(()=>{
        getTaskList();
    },[]);
    
    return(
        <div className="tasksheetContainer">
            {taskList.length >= 0 ? taskList.map((task) => (
                <TaskItem key={task?.id} id={task?.id} desc={task?.todo} isCompleted={task?.completed}/>
            )):
            <div>Task list is empty</div>}
        </div>
    )
}

export default TaskSheet;