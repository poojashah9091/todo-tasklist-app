import React from "react";
import { useState } from "react";
import TaskDetails from "../TaskDetails";
import logo from "../../images/logo.png";
import './style.scss';

const Header = () => {

    const [showTaskDetailsModel, setShowTaskDetailsModel] = useState(false);

    const addTaskHandler = () =>{
        setShowTaskDetailsModel(true);
    }

    const handleClose = () => {
        setShowTaskDetailsModel(false);
    };


    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <img src={logo} alt="logo" className="logo"/>
            </div>
            <div className="CTAContainer">
                <button className="primaryCTA" onClick={addTaskHandler}>Add a Task</button>
            </div>
            {showTaskDetailsModel && <TaskDetails 
                                        open = {showTaskDetailsModel} 
                                        handleClose = {handleClose} 
                                        actionType = "Add"
                                    />
            }
        </div>
    )
}

export default Header;