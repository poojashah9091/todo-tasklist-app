import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAllTasks } from "../../data/taskListSlice";
import TaskItem from "../TaskItem";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import "./style.scss";

const TaskSheet = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState({type: "success", msg: ""});
    const taskFetchStatus = useSelector(store => store.taskList.status.GET_ALL);
    const taskDeleteStatus = useSelector(store => store.taskList.status.DELETE); 
    const taskUpdateStatus = useSelector(store => store.taskList.status.UPDATE);
    const taskAddStatus = useSelector(store => store.taskList.status.ADD);
    const taskItems = useSelector(store => store.taskList.tasks);
    const taskFetchError = useSelector(store => store.taskList.error.GET_ALL);

    useEffect(()=>{
        dispatch(fetchAllTasks());
    }, [dispatch]);

    const toastMessage = (status) =>{
        if(status==="succeeded"){
            setOpen(true);
            setDialogMessage({type: "success", msg:"Action performed successfully"});
        }
        else if(status==="failed"){
            setOpen(true);
            setDialogMessage({type: "error", msg:"This action cannot be performed on newly added tasks"});
        }
    }
   
    useEffect(()=>{
        toastMessage(taskDeleteStatus);
    },[taskDeleteStatus]);

    useEffect(()=>{
        toastMessage(taskUpdateStatus);
    },[taskUpdateStatus]);

    useEffect(()=>{
        toastMessage(taskAddStatus);
    },[taskAddStatus]);

    const handleClose = () => {
        setOpen(false);
        setDialogMessage({type: "success", msg: ""});
    };

    // Early return in case of error condition
    if(taskFetchStatus==='failed'){
        return (
            <div className="tasksheetContainer">
                <div className="errorMessage">{taskFetchError}</div>
            </div>
        )
    }
    
    return(
        <div className="tasksheetContainer">
            <Snackbar anchorOrigin={{horizontal: 'right', vertical: 'top'}} sx={{ marginTop: 5}} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant="filled" onClose={handleClose} severity={dialogMessage.type==="success" ? "success" : "error"} sx={{ width: '100%' }}>
                    {dialogMessage.msg}
                </Alert>
            </Snackbar>
            {
                taskFetchStatus==='loading' ? 
                    <div className="loader">
                        <CircularProgress/>
                    </div> :
                    taskFetchStatus==='succeeded' && taskItems.length>=0 ? 
                        taskItems.map((task, index) => (
                            <TaskItem key={index} id={task?.id} desc={task?.todo} isCompleted={task?.completed}/>
                        ))  :
                        <div>Task list is empty</div>
            }
        </div>
    )
}

export default TaskSheet;