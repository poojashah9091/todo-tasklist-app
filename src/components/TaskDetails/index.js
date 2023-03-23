import React, { useState } from "react";
import { Dialog } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import "./style.scss";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../data/taskListSlice";


const TaskDetails = ({open, handleClose, desc="", actionType, id=""}) => {

    const [taskData, setTaskData] = useState(desc);
    const dispatch = useDispatch();

    const onSubmit = () =>{
        if(actionType==="Update"){
            dispatch(updateTask({id, taskData}));
            handleClose();
        }
        else if(actionType==="Add"){
            dispatch(addTask(taskData));
            handleClose();
        }
    }

    const onChangeHandler = (e) =>{
        setTaskData(e.target.value);
    }


    return (<>
        <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {actionType==="Update" ? "Update task details" : "Add new task details"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <textarea className="taskDetails" value={taskData} onChange={onChangeHandler}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={onSubmit} className="primaryCTA">Submit</button>
                </DialogActions>
        </Dialog>
    </>);
}

export default TaskDetails;