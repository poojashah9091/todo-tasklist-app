import React from "react";
import logo from "../../images/logo.png";
import './style.scss';

const Header = () => {
    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <img src={logo} alt="logo" className="logo"/>
            </div>
            <div className="CTAContainer">
                <button className="primaryCTA">Add a Task</button>
                <button className="secondaryCTA">Complete All</button>
                <button className="secondaryCTA">Delete All</button>
            </div>
        </div>
    )
}

export default Header;