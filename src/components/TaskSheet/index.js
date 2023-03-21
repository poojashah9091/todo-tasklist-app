import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAllTasks } from "../../data/taskListSlice";
import TaskItem from "../TaskItem";
import { Dialog } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import "./style.scss";

const TaskSheet = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const taskFetchStatus = useSelector(store => store.taskList.status.GET_ALL);
    const taskDeleteStatus = useSelector(store => store.taskList.status.DELETE); 
    const taskItems = useSelector(store => store.taskList.tasks);
    const taskFetchError = useSelector(store => store.taskList.error.GET_ALL);

    useEffect(()=>{
        dispatch(fetchAllTasks());
    }, []);
   
    useEffect(()=>{
        if(taskDeleteStatus==="succeeded"){
            setOpen(true);
            setDialogMessage("Task deleted successfully..!!");
        }
        else if(taskDeleteStatus==="failed"){
            setOpen(true);
            setDialogMessage("Task deletion failed..!!");
        }
    },[taskDeleteStatus]);

    const handleClose = () => {
        setOpen(false);
        setDialogMessage("");
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
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            {
                taskFetchStatus==='loading' ? 
                    <div className="loader">
                        <CircularProgress/>
                    </div> :
                    taskFetchStatus==='succeeded' && taskItems.length>=0 ? 
                        taskItems.map((task) => (
                            <TaskItem key={task?.id} id={task?.id} desc={task?.todo} isCompleted={task?.completed}/>
                        ))  :
                        <div>Task list is empty</div>
            }
        </div>
    )
}

export default TaskSheet;