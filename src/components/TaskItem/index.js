import React, { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import "./style.scss";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../data/taskListSlice";
import TaskDetails from "../TaskDetails";

const TaskItem = ({desc, id}) => {

    const dispatch = useDispatch();
    const [showTaskDetailsModel, setShowTaskDetailsModel] = useState(false);

    const checkBoxClickHandler = (id) => {
    }

    const deleteHandler = () => {
        dispatch(deleteTask(id));
    }

    const editHandler = () => {
        setShowTaskDetailsModel(true);
    }

    const handleClose = () => {
        setShowTaskDetailsModel(false);
    };

    return (
        
        <div className="taskItemCardContainer">
            <div className="taskItemData">
                <label className="container">
                    <input type="checkbox" onChange={e=> checkBoxClickHandler(e)} id={id}/>
                    <label className="label">{desc}</label>
                    <span className="checkmark"/>
                </label>
            </div>
            <div className="taskItemCTA">
                <div className="iconsContainer" onClick={editHandler}><EditIcon/></div>
                <div className="iconsContainer" onClick={deleteHandler}><DeleteOutlineIcon/></div>
            </div>
            {showTaskDetailsModel && <TaskDetails 
                                        open = {showTaskDetailsModel} 
                                        handleClose = {handleClose} 
                                        desc = {desc} 
                                        actionType = "Update"
                                        id = {id}
                                    />
            }

        </div>
        
    )
}

export default TaskItem;